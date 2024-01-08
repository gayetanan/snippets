class Accordion {
    constructor({ accordionItems, triggerElement, bodyRef }) {
        this.#init(accordionItems, triggerElement, bodyRef)
    };
    // initalize function
    #init(accordionItems, triggerElement, bodyRef) {

        const items = document.querySelectorAll(`.${accordionItems}`);
        // set current active accordion
        for (let i = 0; i < items.length; i++) {
            const current = items[i];
            const currentBody = current.querySelector(`.${bodyRef}`);
            currentBody.style.overflow = "hidden"
            if (current.getAttribute("aria-active")) {
                this.current = current;
                this.currentBody = currentBody;
                continue;
            } else {
                this.#setHeight(items[i].querySelector(`.${bodyRef}`), true)
            }
        }
        // select all triggers
        const triggers = document.querySelectorAll(`.${triggerElement}`);
        // se default height
        if (this.current) {
            this.#setHeight(this.currentBody);
        }
        // responsive height
        window.addEventListener("resize", () => {
            if (this.current) {
                this.#setHeight(this.currentBody);
            }
        })
        triggers.forEach((trigger) => {
            trigger.addEventListener("click", (e) => {
                const triggeredAccordion = e.target.parentElement.parentElement;
                if (this.current) {
                    if (triggeredAccordion === this.current) {
                        this.#collapseItem(this.current);
                    } else {
                        this.#collapseItem(this.current);
                        this.#openItem(triggeredAccordion);
                    }
                } else {
                    this.#openItem(triggeredAccordion);
                }
            })
        })

    }
    #setHeight(itemBody, collapse) {
        let height = 0;
        if (!collapse) {
            height = itemBody.children[0].getBoundingClientRect().height
        }
        itemBody.style.height = height + "px"
    }

    #collapseItem(item) {
        item.children[1].style.height = "0px"
        item.removeAttribute("aria-active")
        this.current = null
        this.currentBody = null
    }
    #openItem(item) {
        this.current = item
        this.currentBody = item.children[1]
        item.setAttribute("aria-active", "true")
        this.#setHeight(this.currentBody)
    }
}
window.Accordion = Accordion;