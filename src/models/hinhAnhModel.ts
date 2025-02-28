class HinhAnhModel {
maHinhAnh:number;
tenHinhAnh?:number;
laIcon?:boolean;
duongDanger?:string;
duLieuAnh?:string;
 constructor(
     maHinhAnh:number,
     tenHinhAnh?:number,
     laIcon?:boolean,
     duongDanger?:string,
     duLieuAnh?:string,


)
 {
     this.maHinhAnh = maHinhAnh;
     this.tenHinhAnh = tenHinhAnh;
     this.laIcon = laIcon;
     this.duongDanger = duongDanger;
     this.duLieuAnh = duLieuAnh;
 }

}


export default HinhAnhModel;