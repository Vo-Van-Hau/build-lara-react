<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
</head>
<style>
  td button{
    border:none;
  }
  button a{text-decoration: none;color:#fff}
  a:hover{color:#e2ff00}
</style>
<body>
@if (session('status'))
    <div class="alert alert-success">
        {{ session('status') }}
    </div>
@endif
<table class="table">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Sub-Category Number</th>
      <th scope="col">Icon</th>
      <th scope="col">Action</th>

      
    </tr>
  </thead>
  <tbody>
    @foreach($result as $item)
    <tr>
      <th scope="row">{{$item->label}}</th>
      <td>{{count($item->children)}}</td>
      <td><img src="{{$item->icon_link}}" alt=""></td>
      <td >
        <button style="background-color:#0a6cfc;color:#fff"><a href="/list/category/sub-category/{{$item->value}}">view</a></button>
        <button style="background-color:#fd0000;color:#fff"><a href="/list/category/sub-category/add/{{$item->value}}">Add</a></button>
    </td>
    </tr>
    @endforeach
  </tbody>
</table>
</body>
</html>