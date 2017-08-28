export interface OnInit {
    onInit(): void;
}

export interface OnStart {
    onStart(): void;
}

export interface OnStop {
    onStop(): void;
}

export interface OnExit {
    onExit(): void;
}

export interface MoApplicationCycleLife extends OnInit, OnStart, OnStop {
}

export interface MoInstanceCycleLife extends OnInit, OnStart, OnStop, OnExit {
}

export interface MoCycleLife extends OnInit, OnStart, OnStop, OnExit {
}
