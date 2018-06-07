# fullscreen-polyfill

Embrace standard fullscreen API, bypass vendor-perfixed fullscreen API.

## Polyfilled Contents

**Properties**  
+ Document#fullscreenEnabled
+ Document#fullscreen
+ Document#fullscreenElement

**Methods**  
+ Element#requestFullscreen()
+ Document#exitFullscreen()

**Events**  
+ Document fullscreenchange
+ Document fullscreenerror
+ Document#onfullscreenchange
+ Document#onfullscreenerror

### Tested Browsers
+ Internet Explorer 11
+ Edge 16
+ Chrome 66
+ Firefox 60

### Known Limitations:
1. For events `fullscreenchange` and `fullscreenerror`, properties of the `event` parameter in listener function are not reliable.
