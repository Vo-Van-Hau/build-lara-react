<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Google\Cloud\Translate\V2\TranslateClient;

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
});


