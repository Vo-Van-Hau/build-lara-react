<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Intervention\Image\Facades\Image as InterventionImage;

class UploadImageController extends Controller {

    protected $allowedfileExtension = ['pdf', 'jpg', 'png', 'webp'];

    /**
     * @author <hauvo1709@gmail.com>
     * @todo:
     * @param  \Illuminate\Http\Request $request
     * @return void
     */
    public function post_fileimage_uploader(Request $request) {
        if($request->isMethod('post')) {
            try {
                if($request->hasFile('image_link')) {
                    /**
                     * Upload to thumbnails
                     */
                    $file = $request->file('image_link');
                    $upload_path = 'userdata/upload/products/thumbnails/280_280';
                    $filename = date('YmdHis') . '_' . time() . '_' .  str_replace(array('~', '`', ':', '\\', '/', '*', '#', '&', '?', ' '), '', $file->getClientOriginalName());
                    $extension = $file->getClientOriginalExtension();
                    $check = in_array($extension, $this->allowedfileExtension);
                    $file_path = $upload_path . '/' . $filename;
                    if($check) {
                        if(!file_exists($file_path)) {
                            if(!file_exists($upload_path)) {
                                mkdir($upload_path, 0755, true);
                            }
                            chmod($upload_path, 666);
                            $img = InterventionImage::make($file->path());
                            $img->resize(280, 280)->save(public_path($file_path));
                            return response()->json([
                                'status' => true,
                                'file_url' => url($file_path),
                                'message' => 'File is uploaded !'
                            ]);
                        } else {
                            return response()->json([
                                'status' => false,
                                'message' => 'File is existed !'
                            ]);
                        }
                    } else {
                        return response()->json([
                            'status' => false,
                            'message' => 'Not allowed file extension...!'
                        ]);
                    }
                }
                return response()->json([
                    'status' => false,
                    'message' => 'No file source...!'
                ]);
            }
            catch (\Exception $exception) {
                return response()->json([
                    'status' => false,
                    'message' => 'Error when uploading...!',
                    'message_detail' => $exception->getMessage(),
                ]);
            }
        }
        return response()->json([
            'status' => false,
            'message' => 'Access denied !'
        ]);
    }
}
