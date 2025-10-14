import { Product } from "@/types/Product"

export const products: Product[] = [
    {
        id: 1,
        name: "Hot Roll Salmão",
        description: "8 unidades com salmão, cream cheese e cebolinha.",
        price: 17.99,
        image: "/rotroll.jpeg",
        category: "Pratos Quentes",
    },
    {
        id: 2,
        name: "Temaki Empanado 120g",
        description: "Clássico temaki grelhado com cream cheese e cebolinha.",
        price: 19.99,
        image: "/temakifrito.jpeg",
        category: "Pratos Quentes",
    },
    {
        id: 3,
        name: "Temaki de Salmão 100g",
        description: "Temaki com salmão.",
        price: 17.99,
        image: "/temaki-cru-salmao.jpeg",
        category: "Pratos Crus",
    },
    {
        id: 4,
        name: "Temaki Philadelphia 120g",
        description: "Temaki com salmão, cream cheese e cebolinha.",
        price: 19.99,
        image: "/temakicru.jpeg",
        category: "Pratos Crus",
    },
    {
        id: 5,
        name: "Uramaki Philadelphia ",
        description: "8 unidades com salmão, cream cheese, arroz.",
        price: 19.99,
        image: "/uramakifiladefia.jpeg",
        category: "Pratos Crus",
    },
    {
        id: 6,
        name: " Nigiri Jô ",
        description: "8 unidades com salmão, cream cheese, arroz e cebolinha.",
        price: 19.99,
        image: "/jo.jpeg",
        category: "Pratos Crus",
    },
    {
        id: 6,
        name: "Niguiri Salmão",
        description: "8 unidades com salmão e arroz.",
        price: 19.99,
        image: "/nigiri.jpeg",
        category: "Pratos Crus",
    },
    {
        id: 7,
        name: "Sashimi Salmão",
        description: "9 unidades de salmão",
        price: 24.99,
        image: "/sashimi.jpeg",
        category: "Pratos Crus",
    },

    {
        id: 6,
        name: "Combinado de Salmão",
        description: "12 fatias de salmão fresco cortadas na hora.  1 temaki 70g, 2 Jó, 2 uramak Filadélfia, 3 sashimi salmão, 2 Niguiri salmão, 2 Hossomak "

        ,
        price: 39.99,
        image: "/combinado.jpeg",
        category: "Pratos Crus",
    },
    {
        id: 99,
        name: "Monte seu Combo",
        description: "Monte seu combo personalizado escolhendo seus itens favoritos!",
        price: 0,
        image: "/sashimi.jpg",
        category: "Combos",
        options: [
            { id: 1, name: "Sashimi", price: 2.99 },
            { id: 2, name: "Jô", price: 2.99 },
            { id: 3, name: "Temaki Philadelphia 70g", price: 9.99 },
            { id: 4, name: "Uramaki ", price: 2.99 },
            { id: 5, name: "Hossomak", price: 2.99 },
            { id: 6, name: "Niguiri Salmão", price: 3.99 },
        ],
    }

]
