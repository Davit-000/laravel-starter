@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Create new Category</div>

                    <div class="card-body">
                        <form action="{{route('categories.store')}}" method="post">
                            @csrf

                            <div class="form-group">
                                <label for="name">Category name</label>
                                <input name="name" value="{{old('name')}}" type="text" class="form-control @error('name') is-invalid @enderror" id="name" placeholder="Enter category name...">
                                @error('name')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>

                            <button type="submit" class="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
