const categories = [
    { id: "1", name: "Yapay Zeka", description: "Yapay Zeka kategori ürünleri" },
    { id: "2", name: "Sağlık Teknolojileri", description: "Sağlık Teknolojileri kategori ürünleri" },
    { id: "3", name: "Siber Güvenlik", description: "Siber Güvenlik kategori ürünleri" },
    { id: "4", name: "Savunma Sanayi", description: "Savunma Sanayi kategori ürünleri" },
    { id: "5", name: "Yenilenebilir Enerji", description: "Yenilenebilir Enerji kategori ürünleri" },
];

module.exports = class Category {
    constructor(name, description) {
        this.id = (categories.length + 1).toString();
        this.name = name;
        this.description = description;
    }

    saveCategory() {
        categories.push(this);
    }

    static getAll() {
        return categories;
    }

    static getById(id) {
        return categories.find(i => i.id === id);
    }

    static update(category) {
        const index = categories.findIndex(i => i.id === category.id);
        categories[index].name = category.name;
        categories[index].description = category.description;
    }

    static deleteById(id) {
        const index = categories.findIndex(i => i.id === id);
        categories.splice(index, 1);
    }
}