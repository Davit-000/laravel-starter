@extends('layouts.admin')

@section('content')
    <router-view
        :action="'{{route('admin.login')}}'"
        :errs="{{$errors}}"
        :inputs="{{json_encode(session()->getOldInput())}}"
    ></router-view>
@endsection
