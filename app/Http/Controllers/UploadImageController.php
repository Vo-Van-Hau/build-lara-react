<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UploadImageController extends Controller {

    protected $allowedfileExtension = ['pdf', 'jpg', 'png'];

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
                    $file = $request->file('image_link');
                    $width = getimagesize($file)[0];
                    $height = getimagesize($file)[1];
                    $upload_path = '/userdata/upload/products';
                    $filename = date('YmdHis') . '_' .  str_replace(array('~', '`', ':', '\\', '/', '*', '#', '&', '?', ' '), '', $file->getClientOriginalName());
                    $extension = $file->getClientOriginalExtension();
                    $check = in_array($extension, $this->allowedfileExtension);
                    $file_path = $upload_path . '/' . $filename;
                    if($check) {
                        if(!file_exists($file_path)) {
                            $file->move(public_path($upload_path), $filename);
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
                    }
                }
                return response()->json([
                    'status' => false,
                    'message' => 'No file source...!'
                ]);
            }
            catch (\Exception $errors) {
                return response()->json([
                    'status' => false,
                    'message' => 'Error when uploading...!'
                ]);
            }
        }
        return response()->json([
            'status' => false,
            'message' => 'Access denied !'
        ]);
    }
}
