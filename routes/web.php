<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Google\Cloud\Translate\V2\TranslateClient;
use Carbon\Carbon;
use App\Http\Controllers\UploadImageController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::prefix('testing')->group(function() {
    Route::get("/notification", function() {
        $user = \Modules\Users\Models\Users::find(6);
        if(!empty($user)) {
            $user->notify(new \App\Notifications\OrderTrackingStatus($user)); // not oke
            echo "Done";
        }
        exit;
    });
    Route::get("/notification/user", function() {
        $user = \Modules\Users\Models\Users::find(6);
        if(!empty($user)) {
            $notifications = $user->notifications;
            foreach($notifications as $notification) {
                echo $notification->data["name"] . " - " . $notification->data["email"] . "<br/>";
            }
        }
        exit;
    });
    Route::get("/language", function() {
        $current_language_1 = Config::get("app.locale");
        $current_language_2 = app()->getLocale();
        $current_language_3 = \Illuminate\Support\Facades\App::currentLocale();
        $current_language_4 = trans("OrdersFrontend::common.0");
        if (\Illuminate\Support\Facades\App::isLocale("en")) {
            echo "Hello Laravel";
            \Illuminate\Support\Facades\App::setLocale("en");
        }
        echo $current_language_4;
    });
    Route::get("/case", function() {
        // dd(request()->getHost());
    });
    Route::get("/lokalise", function(Request $request) {
        $token_path = storage_path() . '/token/lokalise/_token.json';
        $project_path = storage_path() . '/token/lokalise/_projects.json';
        if(file_exists($token_path) && file_exists($project_path)) {
            $api_token = json_decode(file_get_contents($token_path))->api_token;
            $projects = json_decode(file_get_contents($project_path))->projects;
            if(!empty($projects)) {
                $project = \Illuminate\Support\Arr::first($projects, function ($value, $_i) {
                    return $value->name == 'translate-PHP-442595';
                });
                if(!empty($project)) {
                    $client = new \GuzzleHttp\Client();
                    $response = $client->request('GET', 'https://api.lokalise.com/api2/projects/'.$project->id.'/keys', [
                        'headers' => [
                          'X-Api-Token' => $api_token,
                          'accept' => 'application/json',
                        ],
                    ]);
                    $response_body = json_decode($response->getBody());
                    if($response_body->project_id != $project->id) return;
                    $keys = $response_body->keys;
                    foreach($keys as $key => $value) {
                        $keys[$value->key_name->web] = [
                            'id' => $value->key_id,
                            'name' => $value->key_name,
                        ];
                        unset($keys[$key]);
                    }
                    $response = $client->request('GET', 'https://api.lokalise.com/api2/projects/'.$project->id.'/translations', [
                        'headers' => [
                          'X-Api-Token' => $api_token,
                          'accept' => 'application/json',
                        ],
                    ]);
                    $response_body = json_decode($response->getBody());
                    if($response_body->project_id != $project->id) return;
                    $translations = $response_body->translations;
                    $translation_loop = [];
                    foreach($translations as $key => $translation) {
                        if($translation->language_iso == 'vi') {
                            // Get monitored language
                            $translation_loop[] = $translation;
                        } else {
                            // Reset automated languages to empty
                            $translation_id = $translation->translation_id;
                            $client->request('PUT', 'https://api.lokalise.com/api2/projects/'.$project->id.'/translations/'.$translation_id,
                                [
                                    'body' => '{
                                        "translation": ""
                                    }',
                                    'headers' => [
                                        'X-Api-Token' => $api_token,
                                        'accept' => 'application/json',
                                        'content-type' => 'application/json',
                                    ],
                                ]
                            );
                        }
                    }
                    //------------------------Logic------------------------
                    $input_title = json_encode("VIỆC LÀM BRSE KỸ SƯ CẦU NỐI ");
                    $input_description = json_encode("<span>Chịu trách nhiệm quản lý</span>");
                    foreach($translation_loop as $key => $item) {
                        $translation_id = $item->translation_id;
                        $input = '';
                        if($item->key_id == $keys['job_description']['id']) {
                            $input = $input_description;
                        } elseif($item->key_id == $keys['job_title']['id']) {
                            $input = $input_title;
                        } else {}
                        $response = $client->request('PUT', 'https://api.lokalise.com/api2/projects/'.$project->id.'/translations/'.$translation_id,
                            [
                                'body' => '{
                                    "translation": '.$input.'
                                }',
                                'headers' => [
                                    'X-Api-Token' => $api_token,
                                    'accept' => 'application/json',
                                    'content-type' => 'application/json',
                                ],
                            ]
                        );
                    }
                }
            }
        }
    });
    Route::get('/google-cloud-translation', function(Request $request) {
        $client_secret_path = storage_path() . '/token/google/translate-php-442595/client_secret_672693215324-760c0lcvevnaep34aa3jjio83tfvq8q2.apps.googleusercontent.com.json';
        $service_account_key_path = storage_path() . '/token/google/translate-php-442595/translate-php-442595-1e67e5dea8c1.json';
        if(file_exists($client_secret_path) && file_exists($service_account_key_path)) {
            try {
                $translate = new TranslateClient([
                    'keyFilePath' => $service_account_key_path,
                    'retries' => 3
                ]);
                $input_title = "<span>Chịu</span>";
                $input_description = "<strong>Hello</strong>";
                $result = [];
                foreach(array("en", "ja") as $key => $language) {
                    $response = $translate->translateBatch([$input_title, $input_description], [
                        'source' => 'vi',
                        'target' => $language
                    ]);
                    foreach ($response as $_key => $_response) {
                        unset($response[$_key]);
                        $response[$_key] = $_response['text'];
                    }
                    $result[$language] = $response;
                }
                /** */
                // $languages = $translate->localizedLanguages();
                dd($result);
            }
            catch(\Exception $exception) {
                echo $exception->getMessage();
            }
        }
    });
    Route::get('date', function() {
        $data = [];
        $current_year = date('Y');
        for($m = 1; $m <= 12; $m++) {
            $start_date = (new DateTime($current_year . '-' . $m . '-' . '01'))->format('Y-m-d 00:00:00');
            $end_date = date('Y-m-t 23:59:59', strtotime($start_date));
            $data[$m] = [
                'start_date' => $start_date,
                'end_date' => $end_date,
            ];
        }
        dd($data);
    });
});

Route::get("/list/category", function() {
    $result = DB::table('product_categories')->where([
        'parent_id' => 0,
        'deleted' => 0,
        'status' => 1
    ])->select('title as label', 'id as key', 'id as value', 'icon_link')->get();
    foreach($result as $key => $item) {
        $id = $item->value;
        $result[$key]->children = DB::table('product_categories')->where([
            'parent_id' => $id,
            'deleted' => 0,
            'status' => 1
        ])->select('title as label', 'id as key', 'id as value', 'icon_link')->get();
    }
   return view('category',compact('result'));
});

Route::get("/list/category/sub-category/{parentid}", function($parentid) {
    $result = DB::table('product_categories')->where([
        'parent_id' => $parentid,
        'deleted' => 0,
        'status' => 1
    ])->select('title as label', 'id as key', 'id as value', 'icon_link')->get();
   return view('sub-category', compact('result'));
});

Route::any("/list/category/sub-category/update/{id}", function($id,Request $request) {
    if($request->isMethod('get')){
        $result = DB::table('product_categories')->where([
            'id' => $id,
            'deleted' => 0,
            'status' => 1
        ])->select('title as label', 'id as key', 'id as value', 'icon_link')->first();
       return view('update-subcategory',compact('result'));
    }else{
        $result = DB::table('product_categories')->where([
            'id' => $id,
            'deleted' => 0,
            'status' => 1
        ])->select('title as label', 'parent_id', 'id as key', 'id as value', 'icon_link')->update([
            'title' => $request->name,
        ]);
        $result_id = DB::table('product_categories')->where([
            'id' => $id,
            'deleted' => 0,
            'status' => 1
        ])->select('parent_id')->first();
        return redirect('/list/category/sub-category/'.$result_id->parent_id)->with('status', 'Cập nhật thành công!');
    }
   
});

Route::any("/list/category/sub-category/add/{parent_id}", function($parent_id, Request $request) {
  
    if($request->isMethod('get')){
       return view('add_cate', compact('parent_id'));
    }else{
        $result = DB::table('product_categories')->insert([
            'parent_id' => $parent_id,
            'deleted' => 0,
            'status' => 1,
            'icon_link' => '',
            'title' => $request->title,
            'uncle_id' => 1,
            'friend_id' => 2,
            'user_created_id'=> 0
        ]);
          return redirect('/list/category/sub-category')->with('status', 'Cập nhật thành công!');
        // $result = DB::table('product_categories')->where([
        //     'id' => $id,
        //     'deleted' => 0,
        //     'status' => 1
        // ])->select('title as label', 'parent_id', 'id as key', 'id as value', 'icon_link')->update([
        //     'title' => $request->name,
        // ]);
        // $result_id = DB::table('product_categories')->where([
        //     'id' => $id,
        //     'deleted' => 0,
        //     'status' => 1
        // ])->select('parent_id')->first();
        // return redirect('/list/category/sub-category/'.$result_id->parent_id)->with('status', 'Cập nhật thành công!');
    }
});
