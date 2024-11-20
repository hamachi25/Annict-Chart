import { FaGithub } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { AnnictIcon } from "@/components/icon";

export function Footer() {
    return (
        <footer className="p-4 flex flex-col gap-3">
            <div className="flex justify-center gap-8">
                <a
                    href="https://github.com/hamachi25/Annict-Chart"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FaGithub size={25} />
                </a>
                <a
                    href="https://annict.com/@usotsuki_elf"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <AnnictIcon size={25} />
                </a>
                <a href="https://x.com/FisqWclCKB8xtLC" target="_blank" rel="noopener noreferrer">
                    <FaTwitter size={25} />
                </a>
            </div>
            <div>
                <p className="text-center text-sm text-gray-500">© 2024 hamachi</p>
            </div>
        </footer>
    );
}
