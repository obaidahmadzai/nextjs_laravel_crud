<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules;
use Symfony\Component\HttpKernel\Profiler\Profile;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return User::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $this->validateData($request);
        $user =  User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)

        ]);

        if ($request->hasFile('profile')) {
            $user->update([
                'profile' => $request->file('profile')->store('profile', 'public')
            ]);
        }
        return response(["msg" => "Profile has been created successfully"], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $data =  User::find($id);
        return response($data, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {

        $this->validateData($request);
        $user  = User::find($request->id);
        if ($user) {

            $user->update([
                'name' => $request->name,
                'email' => $request->email,

            ]);
            if (!empty($request->password)) {
                $user->update(['password' => Hash::make($request->password)]);
            }
            if ($request->hasFile('profile')) {
                if (file_exists(public_path('storage/' . $user->profile))) {

                    if ($user->profile) {
                        unlink("storage/" . $user->profile);
                    }
                }
                $user->update([
                    'profile' => $request->file('profile')->store('profile', 'public')
                ]);
            }
            return response(["msg" => "Profile has been Updated successfully"], 200);
        } else {
            return response(["msg" => "User not found"], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        if ($id == auth()->id()) {
            return response(["msg" => "Can't delete your own account"], 400);
        }

        $user = User::find($id);
        if (!$user) {
            return response(["msg" => "User not found"], 404);
        }

        $user->delete();
        return response(["msg" => "User deleted successfully"], 200);
    }


    public function validateData(Request $request)
    {
        $rules = [
            'name' => ['required', 'string', 'max:255', 'not_in:"undefined"'],
            'email' => ['required', 'string', 'email', 'max:255', 'not_in:"undefined"', Rule::unique('users')->ignore($request->id)],
            'password' => [Rules\Password::defaults()],
        ];
        if (request()->hasFile('profile')) {
            request()->validate(['profile' => "mimes:jpeg,bmp,png|max:5000"]);
        }
        if ($request->method() == 'POST') {
            $rules['password'][] = 'not_in:"undefined"|required';
        } else {
            $rules['password'][] = 'nullable';
        }

        $validatedData = $request->validate($rules);

        return $validatedData;
    }
}
