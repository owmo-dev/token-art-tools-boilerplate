import "./style.css";

import v_shader from "./shaders/example.vert";
import f_shader from "./shaders/example.frag";

var vert = document.createElement("script");
vert.id = "v-shader";
vert.textContent = v_shader;
vert.type = "x-shader/x-vertex";
document.body.appendChild(vert);

var frag = document.createElement("script");
frag.id = "f-shader";
frag.textContent = f_shader;
frag.type = "x-shader/x-fragment";
document.body.appendChild(frag);

features = {
    hash: hash,
    edition: number,
};
