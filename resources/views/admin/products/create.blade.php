@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Create new Product</div>

                    <div class="card-body">
                        <form action="{{route('products.store')}}" method="post">
                            @csrf
                            <!-- Name -->
                            <div class="form-group">
                                <label for="name">Product name</label>
                                <input name="name" value="{{old('name')}}" type="text" class="form-control @error('name') is-invalid @enderror" id="name" placeholder="Enter product name...">
                                @error('name')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                            <!-- Category -->
                            <div class="form-group">
                                <label for="category">Product category</label>
                                <select name="category_id" class="form-control @error('category_id') is-invalid @enderror" id="category">
                                    <option value="">Product category</option>
                                    @foreach($categories as $category)
                                    <option value="{{$category->id}}" {{old('category_id')==$category->id?'selected':''}}>{{$category->name}}</option>
                                    @endforeach
                                </select>
                                @error('category_id')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                            <!-- Condition -->
                            <div class="form-group">
                                <label for="condition">Product Condition</label>
                                <select name="condition_id" class="form-control @error('condition_id') is-invalid @enderror" id="condition">
                                    <option value="">Select Product condition</option>
                                    @foreach($conditions as $condition)
                                        <option value="{{$condition->id}}" {{old('condition_id')==$condition->id?'selected':''}}>{{$condition->name}}</option>
                                    @endforeach
                                </select>
                                @error('condition_id')
                                <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                            <!-- Colors -->
                            <div class="form-group">
                                <p class="text-black">Product available colors</p>
                                @foreach($colors as $color)
                                <div class="custom-control custom-checkbox custom-control-inline">
                                    <input name="colors[]" value="{{$color->id}}" {{old('colors') && in_array($color->id, old('colors'))?'checked':''}} type="checkbox" class="custom-control-input @error('colors') is-invalid @enderror" id="check{{$color->id}}">
                                    <label class="custom-control-label" for="check{{$color->id}}">{{$color->name}}</label>
                                </div>
                                @endforeach
                                @error('colors')
                                <div class="invalid-feedback" style="display: block;">
                                    {{$message}}
                                </div>
                                @enderror
                            </div>
                            <!-- Quantity -->
                            <div class="form-group">
                                <label for="text">Product Quantity</label>
                                <input type="number" name="quantity" value="{{old('quantity')}}" class="form-control @error('quantity') is-invalid @enderror" id="text" placeholder="Enter product quantity...">
                                @error('quantity')
                                <div class="invalid-feedback">
                                    {{$message}}
                                </div>
                                @enderror
                            </div>
                            <!-- Description -->
                            <div class="form-group">
                                <label for="desc">Product Description</label>
                                <textarea name="description" class="form-control @error('description') is-invalid @enderror" id="desc" rows="5">{{old('desc')}}</textarea>
                                @error('description')
                                <div class="invalid-feedback">
                                    {{$message}}
                                </div>
                                @enderror
                            </div>
                            <!-- Price -->
                            <div class="form-group">
                                <label for="price">Product price</label>
                                <input  name="price" value="{{old('price')}}" type="number" step="0.01" class="form-control @error('price') is-invalid @enderror" id="price" placeholder="Enter product price...">
                                @error('price')
                                <div class="invalid-feedback">
                                    {{$message}}
                                </div>
                                @enderror
                            </div>
                            <!-- Discount -->
                            <div class="form-group">
                                <label for="discount">Product discount</label>
                                <input  name="discount" value="{{old('discount')}}" type="number" step="0.01" class="form-control @error('discount') is-invalid @enderror" id="discount" placeholder="Enter product discount...">
                                @error('discount')
                                <div class="invalid-feedback">
                                    {{$message}}
                                </div>
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
