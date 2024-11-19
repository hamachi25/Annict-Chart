import * as React from "react";
const SvgComponent = (props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" viewBox="0 0 512 512" {...props}>
        <path
            fill="#CD2D59"
            d="M442.1 511.9h-372c-38.7 0-70-31.3-70-70v-372c0-38.7 31.3-70 70-70h372c38.7 0 70 31.3 70 70v372c0 38.7-31.4 70-70 70z"
        />
        <path fill="#FFF" d="m256.3 46.9-172 417.3h64l107.6-271.1 110.6 271.7 63.9.1z" />
        <path
            fill="#FFF"
            d="M464.1 158v52.1L332.4 319.9l-179.6 44.5-104.4 10.7v-40.3l97.5-10 167.9-41.5L464.1 158"
        />
    </svg>
);
export default SvgComponent;
