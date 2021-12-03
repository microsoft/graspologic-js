vec3 tween(vec3 start, vec3 end, float amount) {
  return start + ((end - start) * ease_linear(amount));
}

vec4 tween(vec4 start, vec4 end, float amount) {
  return start + ((end - start) * ease_linear(amount));
}

float tween(float start, float end, float amount) {
  return start + ((end - start) * ease_linear(amount));
}

vec3 tween_attribute(vec3 start, vec3 end, vec2 tweenInfo, float currentTime) {
  #ifdef USE_ANIMATION
  if (tweenInfo.x > 0.0) {
    float tween_progress = max(min((currentTime - tweenInfo.y) / tweenInfo.x, 1.0), 0.0);
    return start + ((end - start) * ease_linear(tween_progress));
  } else {
    return end;
  }
  #else
  return end;
  #endif
}

vec4 tween_attribute(vec4 start, vec4 end, vec2 tweenInfo, float currentTime) {
  #ifdef USE_ANIMATION
  if (tweenInfo.x > 0.0) {
    float tween_progress = max(min((currentTime - tweenInfo.y) / tweenInfo.x, 1.0), 0.0);
    return start + ((end - start) * ease_linear(tween_progress));
  } else {
    return end;
  }
  #else
  return end;
  #endif
}
