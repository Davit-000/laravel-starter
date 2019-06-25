@extends('layouts.admin')

@section('navigation')
    <router-view name="navigation"></router-view>
@endsection

@section('toolbar')
    <router-view name="toolbar" :logout="'{{route('admin.logout')}}'"></router-view>
@endsection

@section('content')
    <router-view></router-view>
@endsection
