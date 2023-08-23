<?php

namespace app\core;
use app\models\HistoryModel;

class Router
{
    private Request $request;
    private Response $response;
    private array $routes = [];

    public function __construct(Request $request, Response $response)
    {
        $this->response = $response;
        $this->request = $request;
    }
    
    public function get($path, $callback)
    {
        $this->routes['get'][$path] = $callback;
    }

    public function resolve()
    {
        $path = $this->request->getPath();
        $method = $this->request->getMethod();
        $callback = $this->routes[$method][$path] ?? false;
        
        if ($callback === false)
        {
            $this->response->setStatusCode(404);
            return "Not found";
        }

        if (is_string($callback))
        {
            return $this->renderView($callback);
        }

        return call_user_func($callback);
    }

    public function renderView($view)
    {
        include_once __DIR__.'\..\views/'.$view;
    }
}