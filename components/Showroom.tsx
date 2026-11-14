'use client';
import React, {Suspense, useRef, useState, useEffect} from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import {products, Product} from '@/lib/data';

function Bottle({product,position,onSelect,scale=1}:{product:Product;position:[number,number,number];onSelect:(p:Product)=>void;scale?:number}){
 const [hover,setHover]=useState(false);
 return <group position={position} scale={scale} onClick={e=>{e.stopPropagation();onSelect(product)}} onPointerOver={e=>{e.stopPropagation();setHover(true);document.body.style.cursor='pointer'}} onPointerOut={()=>{setHover(false);document.body.style.cursor='auto'}}>
  <mesh position={[0,.48,0]} castShadow><boxGeometry args={[.46,.78,.25]}/><meshPhysicalMaterial color={product.color} roughness={.18} metalness={.15} transparent opacity={.88} clearcoat={1}/></mesh>
  <mesh position={[0,.96,0]}><boxGeometry args={[.23,.2,.18]}/><meshStandardMaterial color="#b39868" metalness={.85} roughness={.2}/></mesh>
  <mesh position={[0,.49,.13]}><planeGeometry args={[.32,.28]}/><meshStandardMaterial color={hover?'#e9dabb':'#d7c9ae'} /></mesh>
  <Text position={[0,.51,.137]} fontSize={.038} color="#3e3026" anchorX="center">MAISON NOIR</Text>
  <Text position={[0,.44,.137]} fontSize={.026} color="#3e3026" anchorX="center">{product.name.toUpperCase()}</Text>
  {hover&&<pointLight position={[0,1,.4]} color="#f5d79b" intensity={1} distance={2}/>}
 </group>
}
function Architecture({onSelect}:{onSelect:(p:Product)=>void}){
 return <>
  <color attach="background" args={['#191813']}/><fog attach="fog" args={['#191813',15,34]}/>
  <ambientLight intensity={.8}/><hemisphereLight args={['#fff1d4','#463628',1.1]}/><directionalLight position={[2,8,5]} intensity={1.4} color="#ffe2aa"/>
  <mesh receiveShadow position={[0,-.12,0]}><boxGeometry args={[22,.2,22]}/><meshStandardMaterial color="#8e8473" roughness={.3} metalness={.08}/></mesh>
  {/* floor seams */}{Array.from({length:12},(_,i)=><group key={i}><mesh position={[-11+i*2,.001,0]}><boxGeometry args={[.018,.004,22]}/><meshStandardMaterial color="#b1a594"/></mesh><mesh position={[0,.002,-11+i*2]}><boxGeometry args={[22,.004,.018]}/><meshStandardMaterial color="#b1a594"/></mesh></group>)}
  <mesh position={[0,4,-9]}><boxGeometry args={[22,8,.4]}/><meshStandardMaterial color="#40392f"/></mesh>
  <mesh position={[-10.8,4,0]}><boxGeometry args={[.4,8,18]}/><meshStandardMaterial color="#302c25"/></mesh><mesh position={[10.8,4,0]}><boxGeometry args={[.4,8,18]}/><meshStandardMaterial color="#302c25"/></mesh>
  <mesh position={[0,8,0]}><boxGeometry args={[22,.2,18]}/><meshStandardMaterial color="#29251f"/></mesh>
  {/* wall decorative trim */}{[-9,-6,-3,0,3,6,9].map(x=><mesh key={x} position={[x,4,-8.75]}><boxGeometry args={[.035,7,.04]}/><meshStandardMaterial color="#9a8057" metalness={.75}/></mesh>)}
  <Text position={[0,6.3,-8.72]} fontSize={.57} color="#d5c09a" letterSpacing={.2}>MAISON NOIR</Text><Text position={[0,5.65,-8.72]} fontSize={.14} color="#bfa77e" letterSpacing={.4}>PARFUMERIE</Text>
  {/* six shelf bays */}{[products[3],products[1],products[2],products[0],products[4],products[5]].map((p,i)=>{let x=(i-2.5)*3.15;return <group key={p.id} position={[x,0,-7.8]}>
   <mesh position={[0,2.3,-.2]}><boxGeometry args={[2.7,4.5,.15]}/><meshStandardMaterial color={i===3?'#314039':i===1?'#76625c':'#514539'}/></mesh>
   {[-1.3,1.3].map(v=><mesh key={v} position={[v,2.35,0]}><boxGeometry args={[.05,4.7,.4]}/><meshStandardMaterial color="#bd9b61" metalness={.8} roughness={.25}/></mesh>)}
   {[1.1,2.5,3.9].map(v=><mesh key={v} position={[0,v,0]}><boxGeometry args={[2.65,.08,.75]}/><meshStandardMaterial color="#b19a72" metalness={.6} roughness={.3}/></mesh>)}
   <Text position={[0,4.35,.12]} fontSize={.16} color="#e7d5b7" letterSpacing={.12}>{p.category.toUpperCase()}</Text>
   {[-.8,0,.8].map((v,j)=><Bottle key={j} product={p} position={[v,1.14,.05]} scale={j===1?1:.85} onSelect={onSelect}/>)}
   {[-.65,.65].map((v,j)=><Bottle key={j} product={p} position={[v,2.54,.05]} scale={.72} onSelect={onSelect}/>)}
  </group>})}
  {/* central plinths */}{[-3.4,0,3.4].map((x,i)=><group key={x} position={[x,0,-1]}><mesh position={[0,.55,0]} castShadow><boxGeometry args={[2.4,1.1,1.6]}/><meshStandardMaterial color={i===1?'#54483b':'#776b5a'} roughness={.38}/></mesh><mesh position={[0,1.13,0]}><boxGeometry args={[2.5,.08,1.7]}/><meshStandardMaterial color="#b4a895" roughness={.3}/></mesh><Bottle product={products[i]} position={[0,1.2,0]} scale={1.15} onSelect={onSelect}/><Text position={[0,.7,.81]} fontSize={.11} color="#e8d5b1">{products[i].name.toUpperCase()}</Text></group>)}
  {/* marble billing counter */}<group position={[0,0,2.3]}><mesh position={[0,.55,0]} castShadow><boxGeometry args={[3.4,1.1,1.15]}/><meshStandardMaterial color="#766b5d" roughness={.35}/></mesh><mesh position={[0,1.14,0]}><boxGeometry args={[3.55,.12,1.3]}/><meshStandardMaterial color="#d1c3ad" roughness={.25}/></mesh><mesh position={[0,.53,.59]}><boxGeometry args={[3,.03,.03]}/><meshStandardMaterial color="#b99b66" metalness={.8}/></mesh><Text position={[0,.75,.59]} fontSize={.12} color="#e9d9bb" letterSpacing={.13}>MAISON NOIR</Text><mesh position={[1,1.4,0]} rotation={[.2,0,0]}><boxGeometry args={[.48,.35,.07]}/><meshStandardMaterial color="#292925"/></mesh></group>
  {/* pendant lights */}{[-7,-3.5,0,3.5,7].map(x=><group key={x}><mesh position={[x,7.2,-3]}><cylinderGeometry args={[.015,.015,1.5,8]}/><meshStandardMaterial color="#aa8a57"/></mesh><mesh position={[x,6.45,-3]}><sphereGeometry args={[.22,16,16]}/><meshStandardMaterial color="#ffe3ac" emissive="#d4a25e" emissiveIntensity={1.2}/></mesh><pointLight position={[x,6,-3]} intensity={1.5} distance={9} color="#ffdb9c"/></group>)}
  <ContactShadows position={[0,.01,0]} opacity={.3} scale={22} blur={2.5} far={3}/>
 </>
}
const positions:[[number,number,number],[number,number,number]][]=[[[0,3,9],[0,2,-6]],[[-7.8,2.5,-3.9],[-7.8,2,-7.8]],[[-4.7,2.5,-3.9],[-4.7,2,-7.8]],[[-1.6,2.5,-3.9],[-1.6,2,-7.8]],[[1.6,2.5,-3.9],[1.6,2,-7.8]],[[4.7,2.5,-3.9],[4.7,2,-7.8]],[[7.8,2.5,-3.9],[7.8,2,-7.8]],[[0,2.5,5.7],[0,1,2.3]]];
function CameraRig({stop}:{stop:number}){const controls=useRef<any>();const target=useRef(new THREE.Vector3()); const current=useRef(-1);useFrame(({camera})=>{if(current.current!==stop){current.current=stop;target.current.set(...positions[stop][1]);} const pos=new THREE.Vector3(...positions[stop][0]); if(controls.current&&controls.current.userDataMoving!==false){camera.position.lerp(pos,.035);controls.current.target.lerp(target.current,.035);if(camera.position.distanceTo(pos)<.08)controls.current.userDataMoving=false;controls.current.update()}});useEffect(()=>{if(controls.current)controls.current.userDataMoving=true},[stop]);return <OrbitControls ref={controls} enablePan={false} minDistance={2} maxDistance={16} minPolarAngle={.7} maxPolarAngle={1.55} onStart={()=>{if(controls.current)controls.current.userDataMoving=false}}/>}
export function Showroom({stop,onSelect}:{stop:number;onSelect:(p:Product)=>void}){return <Canvas shadows dpr={[1,1.5]} camera={{position:[0,3,9],fov:52}} gl={{antialias:true}}><Suspense fallback={null}><Architecture onSelect={onSelect}/><CameraRig stop={stop}/></Suspense></Canvas>}
export function BottleViewer({product}:{product:Product}){return <Canvas dpr={[1,1.5]} camera={{position:[2,1.6,3],fov:35}}><ambientLight intensity={1.5}/><directionalLight position={[3,5,3]} intensity={2}/><Suspense fallback={null}><group position={[0,-.55,0]}><Bottle product={product} position={[0,0,0]} scale={1.4} onSelect={()=>{}}/></group><OrbitControls enablePan={false} minDistance={2} maxDistance={6} autoRotate autoRotateSpeed={1}/></Suspense></Canvas>}
