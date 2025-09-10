
import Link from "next/link";
function ModoleForSettingSite(){
    return(
        <div className="rounded shadow p-8">
            <div>
                <ul>
                    <li className="list-none text-right text-xl text-gray-500 mt-8">
                        <Link href="/SettingSite/LogoPhoto">عکس لوگو</Link>
                    </li>
                    <li className="list-none text-right text-xl text-gray-500 mt-8">
                        <Link href="/SettingSite/SliderPhoto">عکس های اسلایدر</Link>
                    </li>
                    <Link href={"/SettingSite/Discount"}>
                    <li className="list-none text-right text-xl text-gray-500 mt-8">محصولات پر تخفیف</li>
                    </Link>
                    <Link href={"/SettingSite/BestSellingProducts"}>
                    <li className="list-none text-right text-xl text-gray-500 mt-8">پر فروش ترین محصولات</li>
                    </Link>
                    <Link href={"/SettingSite/OfferProduct"}>
                    <li className="list-none text-right text-xl text-gray-500 mt-8">پیشنهاد های ویژه</li>
                    </Link>
                    <li className="list-none text-right text-xl text-gray-500 mt-8">لینک شبکه های اجتماعی</li>
                    <li className="list-none text-right text-xl text-gray-500 mt-8">درباره ی ما</li>
                    <li className="list-none text-right text-xl text-gray-500 mt-8">تماس با ما</li>
                </ul>
            </div>
        </div>
    )
}
export default ModoleForSettingSite;