import React, { PropsWithChildren, useState } from "react";
import "@src/common/windows/dropdown/Dropdown.scss";
import { Wdw } from "@src/common/windows/wdw/Wdw";

export function Dropdown(
	props: PropsWithChildren<{
		style?: React.CSSProperties;
		content: React.ReactNode;
		trigger?: "click" | "hover";
	}>,
) {
	const trigger = props.trigger ?? "click";
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div
			style={props.style}
			className="dropdown"
			onClick={(evt) => {
				evt.preventDefault();
				evt.stopPropagation();
			}}
			onMouseEnter={() => {
				if (trigger === "hover") {
					setIsOpen(true);
				}
			}}
			onMouseLeave={() => {
				if (trigger === "hover") {
					setIsOpen(false);
				}
			}}
		>
			<div
				className="dropdown-trigger"
				onClick={() => {
					if (trigger === "click") {
						setIsOpen(!isOpen);
					}
				}}
			>
				{props.children}
			</div>
			<Wdw open={isOpen}>{props.content}</Wdw>
		</div>
	);
}
