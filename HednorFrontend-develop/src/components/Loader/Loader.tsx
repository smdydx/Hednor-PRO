import Image from "next/image";
import logoImg from "@/images/HednorLogo.png";

const Loader = () => {
    return (
        <div className="flex h-screen items-center justify-center bg-white dark:bg-black -mt-20">
            <div className="animate-pulse ">
                <Image
                    width={300}
                    height={300}
                    src={logoImg}
                    alt="Logo"
                />
            </div>
        </div>
    );
};

export default Loader;
