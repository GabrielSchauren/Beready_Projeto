<?php
declare(strict_types=1);

namespace App;

use Cake\Http\BaseApplication;
use Cake\Http\MiddlewareQueue;
use App\Middleware\CorsMiddleware;  // Adicionar esta linha

class Application extends BaseApplication
{
    public function bootstrap(): void
    {
        parent::bootstrap();
    }

    public function middleware(MiddlewareQueue $middlewareQueue): MiddlewareQueue
    {
        // Adicionar CORS primeiro
        $middlewareQueue->add(new CorsMiddleware());

        return $middlewareQueue;
    }
}