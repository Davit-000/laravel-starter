<?php

Route::post('/unique', 'ValidatorsController@unique')->name('validate.unique');
Route::post('/exists', 'ValidatorsController@exists')->name('validate.exists');
