import React, { useCallback, useState } from 'react'
import Cropper from 'react-easy-crop'
import getCroppedImg from './lib/cropImages'

function CropEasy({ photoURL, getCroppedImage }) {
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [rotation, setRotation] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(0)

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }, [])
    const showCroppedImage = useCallback(async () => {
        try {
            const croppedImage = await getCroppedImg(
                photoURL,
                croppedAreaPixels,
                rotation,
            )

            getCroppedImage(croppedImage)
        } catch (e) {
            console.error('err', e)
        }
    }, [croppedAreaPixels, rotation])
    return (
        <div className="App">
            <div className="crop-container">
                <Cropper
                    image={photoURL}
                    crop={crop}
                    zoom={zoom}
                    aspect={4 / 4}
                    rotation={rotation}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                    onRotationChange={setRotation}
                />
            </div>
            <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2  h-12 flex items-center flex-col w-full">
                <input
                    type="range"
                    value={zoom}
                    min={1}
                    max={3}
                    step={0.1}
                    aria-labelledby="Zoom"
                    onChange={e => {
                        setZoom(e.target.value)
                    }}
                    className="w-full"
                />
                <button
                    onClick={showCroppedImage}
                    className="p-5 bg-blue-700 text-white rounded-lg">
                    Crop Image
                </button>
            </div>
        </div>
    )
}

export default CropEasy
