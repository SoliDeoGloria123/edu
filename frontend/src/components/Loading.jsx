import React from "react";

export default function Loading({ size }) {
    return (
        <div>
            <span className={`loading loading-spinner loading-${size}`}></span>
        </div>
    );
}
