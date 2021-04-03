import { trigger, transition, style, animate } from "@angular/animations";

export const fade = trigger('fade',[
    transition(':enter',[
      style({opacity:0}),
      animate(500)
    ]),
  ])

  export const fadeInOut = trigger('fadeInOut',[
    transition(':leave',[
      style({transform: 'translateX(-100%)'}),
      animate("100ms 0.5s")
    ]),
  ])


