<?php
use Cake\Routing\Route\DashedRoute;
use Cake\Routing\RouteBuilder;

return function (RouteBuilder $routes): void {
    $routes->setRouteClass(DashedRoute::class);

    $routes->scope('/', function (RouteBuilder $builder): void {
        $builder->setExtensions(['json']);
        
        // Rotas da API (sem prefixo /api)
        $builder->connect('/health', ['controller' => 'Users', 'action' => 'test']);
        $builder->connect('/auth/login', ['controller' => 'Users', 'action' => 'login', '_method' => 'POST']);
        $builder->connect('/auth/register', ['controller' => 'Users', 'action' => 'register', '_method' => 'POST']);
        $builder->connect('/auth/logout', ['controller' => 'Users', 'action' => 'logout', '_method' => 'POST']);
        
        $builder->connect('/users/profile', ['controller' => 'Users', 'action' => 'profile', '_method' => 'GET']);
        $builder->connect('/users/:id', ['controller' => 'Users', 'action' => 'view', '_method' => 'GET', 'pass' => ['id']]);
        
        // Rota raiz
        $builder->connect('/', ['controller' => 'Users', 'action' => 'test']);
        
        // Rotas legadas
        $builder->connect('/pages/*', 'Pages::display');
        $builder->connect('/login', ['controller' => 'Users', 'action' => 'login']);
        $builder->connect('/logout', ['controller' => 'Users', 'action' => 'logout']);
        $builder->connect('/register', ['controller' => 'Users', 'action' => 'register']);
        
        $builder->fallbacks();
    });
};