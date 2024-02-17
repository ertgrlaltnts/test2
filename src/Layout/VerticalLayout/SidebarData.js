const SidebarData = [
    {
        label: "Menü",
        isMainMenu: true,
    },
    {
        label: "Ana Sayfa",
        icon: "mdi mdi-home-variant-outline",
        url: "/dashboard",
        bgcolor: "bg-primary",
        isHasArrow: true,
    },
    {
        label: "Tahmin - Kupon Ekle",
        icon: "mdi mdi-plus",
        isHasArrow: true,
        url: "/add",
    },

    {
        label: "Vip İçin Ekle",
        icon: "mdi mdi-diamond-stone",
        isHasArrow: true,
        url: "/add-vip",
    },
    
    {
        label: "Düzenlemeler",
        isMainMenu: true,
    },


    {
        label: "Tahminler",
        icon: "mdi mdi-notebook-edit",
        isHasArrow: true,
        url: "/predictions",
    },

    {
        label: "Kuponlar",
        icon: "mdi mdi-note-text",
        isHasArrow: true,
        url: "/coupons",
    },



    {
        label: "Vip Maçlar",
        icon: "mdi mdi-diamond-stone",
        isHasArrow: true,
        url: "/vip-matches",
    },

    {
        label: "Kullanıcı",
        isMainMenu: true,
    },

    {
        label: "Kullanıcılar (Victorilla)",
        icon: "mdi mdi-account",
        isHasArrow: true,
        url: "/users/victorilla",
    },

    {
        label: "Kullanıcılar (Demeter)",
        icon: "mdi mdi-account",
        isHasArrow: true,
        url: "/users/demeter",
    },	 

    {
        label: "Kullanıcılar (Vet)",
        icon: "mdi mdi-account",
        isHasArrow: true,
        url: "/users/vetdaddy",
    },	

]
export default SidebarData;
