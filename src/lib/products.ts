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
        name: "Hot Roll Morango com nutella",
        description: "8 unidades com pedaços de morango e Nutella, empanadas com arroz e finalizadas no açúcar e canela.",
        price: 23.99,
        image: "/nutella.jpeg",
        category: "Pratos Quentes",
    },
    {
        id: 3,
        name: "Hot Roll Doce de leite com banana",
        description: "8 unidades com doce de leite e banana, empanadas com arroz e finalizadas no açúcar e canela",
        price: 19.99,
        image: "/leite.jpg",
        category: "Pratos Quentes",
    },
    {
        id: 4,
        name: "Temaki Empanado 120g",
        description: "Clássico temaki grelhado com cream cheese e cebolinha.",
        price: 19.99,
        image: "/temakifrito.jpeg",
        category: "Pratos Quentes",
    },
    {
        id: 5,
        name: "Temaki de Salmão 100g",
        description: "Temaki com salmão.",
        price: 17.99,
        image: "/temaki-cru-salmao.jpeg",
        category: "Pratos Crus",
    },
    {
        id: 6,
        name: "Temaki Philadelphia 120g",
        description: "Temaki com salmão, cream cheese e cebolinha.",
        price: 19.99,
        image: "/temakicru.jpeg",
        category: "Pratos Crus",
    },
    {
        id: 7,
        name: "Uramaki Filadélfia ",
        description: "8 unidades com salmão, cream cheese, arroz.",
        price: 19.99,
        image: "/uramakifiladefia.jpeg",
        category: "Pratos Crus",
    },
    {
        id: 8,
        name: "Uramaki Skin ",
        description: "8 unidades com salmão grelhado, cream cheese, arroz e cebolinha.",
        price: 19.99,
        image: "/uramakskin.jpeg",
        category: "Pratos Crus",
    },
    {
        id: 9,
        name: " Niguiri Jô ",
        description: "8 unidades com salmão, cream cheese, arroz e cebolinha.",
        price: 22.99,
        image: "/jo.jpeg",
        category: "Pratos Crus",
    },
    {
        id: 10,
        name: "Niguiri Salmão",
        description: "6 unidades com salmão e arroz.",
        price: 19.99,
        image: "/nigiri.jpeg",
        category: "Pratos Crus",
    },
    {
        id: 11,
        name: "Sashimi Salmão",
        description: "9 unidades de salmão",
        price: 24.99,
        image: "/sashimi.jpeg",
        category: "Pratos Crus",
    },

    {
        id: 12,
        name: "Combinado de Salmão",
        description: "12 fatias de salmão fresco cortadas na hora.  1 temaki 70g, 2 Jó, 2 uramak Filadélfia, 3 sashimi salmão, 2 Niguiri salmão, 2 Hossomak 2"

        ,
        price: 39.99,
        image: "/combinado.jpeg",
        category: "Pratos Crus",
    },
    {
        id: 13,
        name: "Sunomono 150g",
        description: "Pepino ralado molho e gergelim",
        price: 7.99,
        image: "/sonomono.jpeg",
        category: "Pratos Crus",
    },



    {
        id: 99,
        name: "Monte seu Combo",
        description: "Monte seu combo personalizado escolhendo seus itens favoritos!",
        price: 0,
        image: "/sashimi1.jpeg",
        category: "Combos",
        options: [
            { id: 1, name: "Sashimi", price: 2.78 },
            { id: 2, name: "Niguiri Jô", price: 2.88 },
            { id: 3, name: "Uramaki Filadélfia", price: 2.50 },
            { id: 4, name: "Hossomaki", price: 1.77 },
            { id: 5, name: "Niguiri Salmão", price: 3.33 },
            { id: 6, name: "Uramaki Skin", price: 2.50 }
        ],
    }

]
