import {create} from 'zustand';
import {persist} from 'zustand/middleware';
type CartItem={id:string;quantity:number;size:string};
type Store={cart:CartItem[];wishlist:string[];add:(id:string,size?:string)=>void;change:(id:string,delta:number)=>void;remove:(id:string)=>void;toggleWish:(id:string)=>void;clear:()=>void};
export const useStore=create<Store>()(persist((set)=>({cart:[],wishlist:[],add:(id,size='50 ml')=>set(s=>({cart:s.cart.some(i=>i.id===id&&i.size===size)?s.cart.map(i=>i.id===id&&i.size===size?{...i,quantity:i.quantity+1}:i):[...s.cart,{id,quantity:1,size}]})),change:(id,delta)=>set(s=>({cart:s.cart.map(i=>i.id===id?{...i,quantity:Math.max(0,i.quantity+delta)}:i).filter(i=>i.quantity>0)})),remove:id=>set(s=>({cart:s.cart.filter(i=>i.id!==id)})),toggleWish:id=>set(s=>({wishlist:s.wishlist.includes(id)?s.wishlist.filter(x=>x!==id):[...s.wishlist,id]})),clear:()=>set({cart:[]})}),{name:'zevaro-cart'}));
