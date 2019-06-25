<?php

namespace App\Http\View\Composers;

use Illuminate\View\View;

class AuthComposer
{
    protected $auth;

    public function __construct()
    {
        $this->auth = json_encode([
            'check' => auth('admin')->check(),
            'user' => auth('admin')->user()
        ]);
    }

    public function compose(View $view)
    {
        $view->with('auth', $this->auth);
    }
}
