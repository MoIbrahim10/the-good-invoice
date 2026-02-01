<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Tab Button Animations
    |--------------------------------------------------------------------------
    |
    | When true, the tab bar and active-tab bubble use layout/spring animations.
    | Set TURN_ON_TABS_ANIMATION=false in .env to disable. Default: true.
    |
    */

    'tabs_animation' => filter_var(
        env('TURN_ON_TABS_ANIMATION', true),
        FILTER_VALIDATE_BOOLEAN
    ),

    /*
    |--------------------------------------------------------------------------
    | Tab Content Animations
    |--------------------------------------------------------------------------
    |
    | When true, switching between tab panels (or form/preview view) uses
    | slide/fade/blur enter and exit animations. Set TURN_ON_TABS_CONTENT_ANIMATION=true
    | in .env to enable. Default: false.
    |
    */

    'tabs_content_animation' => filter_var(
        env('TURN_ON_TABS_CONTENT_ANIMATION', false),
        FILTER_VALIDATE_BOOLEAN
    ),

];
