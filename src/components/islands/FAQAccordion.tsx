import { useState } from 'react';

type FAQItem = {
	question: string;
	answer: string;
};

type FAQAccordionProps = {
	items?: FAQItem[];
};

export default function FAQAccordion({ items = [] }: FAQAccordionProps) {
	const [openIndex, setOpenIndex] = useState(0);

	return (
		<div className="flex flex-1 flex-col gap-3">
			{items.map((item, index) => {
				const isOpen = openIndex === index;

				return (
					<div
						key={item.question + index}
						className={`rounded-xl border border-(--color-charcoal) bg-(--color-ivory) px-5 py-4 transition-all duration-300 ${
							isOpen ? 'shadow-[0_8px_0_var(--color-charcoal)]' : 'shadow-none hover:-translate-y-0.5 hover:shadow-[0_4px_0_var(--color-stone)]'
						}`}
					>
						<button
							type="button"
							onClick={() => setOpenIndex(isOpen ? -1 : index)}
							className="flex w-full items-center justify-between gap-4 text-left bg-red-500"
							aria-expanded={isOpen}
						>
							<p className="font-semibold text-(--color-charcoal)">{item.question}</p>
							<span
								className={`inline-flex h-3.5 w-3.5 items-center justify-center rounded-full border border-(--color-charcoal) text-sm text-(--color-charcoal) transition-transform duration-300 box-shadow-[0_3px_0_green]`}
							>
								
							</span>
						</button>

						<div
							className={`grid transition-[grid-template-rows,opacity,margin] duration-300 ease-out ${
								isOpen ? 'mt-3 grid-rows-[1fr] opacity-100' : 'mt-0 grid-rows-[0fr] opacity-0'
							}`}
						>
							<div className="overflow-hidden">
								<p className="text-sm leading-6 text-(--color-slate)">{item.answer}</p>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}
