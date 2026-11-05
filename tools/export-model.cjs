// Optional authoring utility: node tools/export-model.cjs. The website needs no build step.
const fs=require('node:fs');
require('../js/circuit-model.js');
const parts=globalThis.RadioGeometry.build();
const json={asset:{version:'2.0',generator:'Team 14 original procedural reconstruction'},scene:0,scenes:[{nodes:[]}],nodes:[],meshes:[],materials:[{name:'Vertex-coloured lab materials',doubleSided:true,pbrMetallicRoughness:{baseColorFactor:[1,1,1,1],metallicFactor:.15,roughnessFactor:.65}}],buffers:[{byteLength:0}],bufferViews:[],accessors:[],extras:{description:'Photo-informed educational assembly; nominal geometry, representative housings and placement. Not a scan or a breadboard wiring plan. Units: metres.'}};
const blocks=[];let offset=0;
for(const p of parts){
  const a=new Float32Array(p.vertices),count=a.length/9,min=[Infinity,Infinity,Infinity],max=[-Infinity,-Infinity,-Infinity];
  for(let i=0;i<a.length;i+=9)for(let j=0;j<3;j++){a[i+j]*=.001;min[j]=Math.min(min[j],a[i+j]);max[j]=Math.max(max[j],a[i+j]);}
  const block=Buffer.from(a.buffer);blocks.push(block);
  const view=json.bufferViews.length;json.bufferViews.push({buffer:0,byteOffset:offset,byteLength:block.length,byteStride:36,target:34962});offset+=block.length;
  const index=json.accessors.length;
  json.accessors.push({bufferView:view,byteOffset:0,componentType:5126,count,type:'VEC3',min,max},{bufferView:view,byteOffset:12,componentType:5126,count,type:'VEC3'},{bufferView:view,byteOffset:24,componentType:5126,count,type:'VEC3'});
  json.meshes.push({name:p.id,primitives:[{attributes:{POSITION:index,NORMAL:index+1,COLOR_0:index+2},material:0,mode:4}]});
  json.scenes[0].nodes.push(json.nodes.length);json.nodes.push({name:p.id,mesh:json.meshes.length-1,translation:p.position.map(n=>n*.001)});
}
json.buffers[0].byteLength=offset;
const raw=Buffer.from(JSON.stringify(json));const j=Buffer.alloc(Math.ceil(raw.length/4)*4,32);raw.copy(j);const bin=Buffer.concat(blocks);
const header=Buffer.alloc(12);header.writeUInt32LE(0x46546c67,0);header.writeUInt32LE(2,4);header.writeUInt32LE(12+8+j.length+8+bin.length,8);
const chunk=(length,type)=>{const b=Buffer.alloc(8);b.writeUInt32LE(length);b.writeUInt32LE(type,4);return b;};
fs.writeFileSync('assets/m1/radio-assembly.glb',Buffer.concat([header,chunk(j.length,0x4e4f534a),j,chunk(bin.length,0x004e4942),bin]));
console.log(`Exported ${parts.length} meshes; ${offset.toLocaleString()} bytes of vertex data.`);
