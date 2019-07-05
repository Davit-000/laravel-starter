@extends('layouts.app')

@section('content')
    <products :products="{{$products}}"></products>
@endsection
