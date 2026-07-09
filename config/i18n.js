const TRANSLATIONS = {
  en: {
    home: {
      hello: 'Hello, recipe app'
    },
    nav: {
      recipes: 'Recipes',
      likedRecipes: 'Liked Recipes',
      myProfile: 'My Profile',
      login: 'Login',
      register: 'Register',
      logout: 'Logout'
    },
    common: {
      search: 'Search',
      clear: 'Clear',
      backToAllRecipes: 'Back to All Recipes',
      backToRecipes: 'Back to Recipes'
    },
    auth: {
      welcomeBack: 'Welcome Back',
      createAccount: 'Create Account',
      email: 'Email',
      password: 'Password',
      loginButton: 'Login',
      registerButton: 'Register',
      username: 'Username',
      confirmPassword: 'Confirm Password',
      dontHaveAccount: "Don't have an account?",
      alreadyHaveAccount: 'Already have an account?',
      loginLink: 'Log in',
      errorPrefix: 'Error: ',
      noAccountFound: 'No account found with that email',
      incorrectPassword: 'Incorrect password',
      emailInvalid: "Email format is invalid (must include '@')",
      passwordTooShort: 'Password must be longer than 6 characters',
      passwordsDontMatch: 'Passwords do not match',
      emailOrUsernameInUse: 'Email or username already in use',
      somethingWentWrong: 'Something went wrong, please try again',
      loginFailed: 'Login failed'
    },
    recipes: {
      allRecipes: 'All Recipes',
      addRecipe: '+ Add Recipe',
      searchLabel: 'Search',
      qPlaceholder: 'e.g. Tuna (matches title, description, tags)',
      tagLabel: 'Tag',
      tagPlaceholder: 'e.g. vegan, quick',
      stapleLabel: 'Staple Food',
      mealCategoryLabel: 'Meal Category',
      categoryLabel: 'Category:',
      byLabel: 'By:',
      allStables: 'All staples',
      allCategories: 'All categories',
      noRecipesMatch: 'No recipes match your search. Try different keywords or filters.',
      noRecipesYet: 'No recipes yet. Be the first to add one!',
      foundOne: '{{count}} recipe found',
      foundMany: '{{count}} recipes found'
    },
    page: {
      likedRecipes: 'Liked Recipes',
      editRecipe: 'Edit Recipe',
      addNewRecipe: 'Add New Recipe',
      profileEdit: 'Edit Profile',
      notFoundTitle: '404 - Page Not Found',
      notFoundMessage: "The recipe you're looking for doesn't exist."
    },
    like: {
      like: 'Like',
      unlike: 'Unlike',
      one: 'like',
      many: 'likes'
    },
    review: {
      one: 'review',
      many: 'reviews'
    },
    comments: {
      title: 'Comments ({{count}})',
      yourRating: 'Your Rating',
      yourReview: 'Your Review',
      reviewPlaceholder: 'Share your thoughts about this recipe...',
      postReview: 'Post Review',
      loginToLeave: 'to leave a review.',
      noReviews: 'No reviews yet. Be the first!'
    },
    sharing: {
      shareLabel: 'Share:',
      twitter: 'Twitter',
      facebook: 'Facebook'
    },
    translation: {
      viewTranslation: 'View Translation',
      hideTranslation: 'Hide Translation',
      languageLabel: 'Translation language',
      loading: 'Translating...',
      failed: 'Translation failed. Please try again later.',
      translatedTitle: 'Translated title',
      translatedDescription: 'Translated description'
    },
    actions: {
      edit: 'Edit',
      delete: 'Delete',
      updateRecipe: 'Update Recipe',
      createRecipe: 'Create Recipe',
      saveChanges: 'Save Changes',
      editProfile: 'Edit Profile',
      cropImage: 'Crop Image',
      reset: 'Reset',
      postReview: 'Post Review',
      replaceImageOptional: 'Replace Image (optional)',
      currentImage: 'Current image: {{image}}'
    },
    categories: {
      Breakfast: 'Breakfast',
      Lunch: 'Lunch',
      Dinner: 'Dinner',
      Dessert: 'Dessert',
      Snack: 'Snack',
      Drink: 'Drink',
      selectCategory: 'Select a category'
    },
    form: {
      descriptionInstructions: 'Description / Instructions',
      title: 'Title',
      categoryLabel: 'Category',
      tagsLabel: 'Tags (comma separated)',
      tagsPlaceholder: 'e.g. vegan, quick, italian',
      recipeImageLabel: 'Recipe Image',
      fileUploadLabel: 'Upload image file',
      fileUploadHelp: 'Select a local image file to crop',
      useImageLink: 'Use image link',
      imageLinkLabel: 'Image URL',
      imageLinkPlaceholder: 'https://example.com/recipe.jpg',
      loadAndCropButton: 'Load and crop',
      imageUrlLoadError: 'Unable to load this image URL. Please make sure the link is directly accessible.',
      imageUrlCropCorsError: 'This image URL cannot be cropped due to cross-origin restrictions. Please try another image URL or upload a file.',
      createRecipeButton: 'Create Recipe',
      updateRecipeButton: 'Update Recipe',
      tagsEmpty: 'Tags'
    },
    profile: {
      memberSince: 'Member since:',
      noBioYet: 'No bio yet.',
      recipesBy: 'Recipes by',
      noRecipesYet: 'No recipes yet.',
      bio: 'Bio',
      profilePicture: 'Profile Picture',
      current: 'Current: {{file}}',
      saveChanges: 'Save Changes'
    },
    liked: {
      empty: 'You have not liked any recipes yet.',
      countOne: 'You liked {{count}} recipe.',
      countMany: 'You liked {{count}} recipes.'
    },
    footer: {
      copy: '&copy; 2026 Recipe Blog'
    }
  },
  de: {
    home: {
      hello: 'Hello, recipe app'
    },
    nav: {
      recipes: 'Rezepte',
      likedRecipes: 'Favorisierte Rezepte',
      myProfile: 'Mein Profil',
      login: 'Anmelden',
      register: 'Registrieren',
      logout: 'Abmelden'
    },
    common: {
      search: 'Suche',
      clear: 'Zurücksetzen',
      backToAllRecipes: 'Zurück zu allen Rezepten',
      backToRecipes: 'Zurück zu den Rezepten'
    },
    auth: {
      welcomeBack: 'Willkommen zurück',
      createAccount: 'Konto erstellen',
      email: 'E-Mail',
      password: 'Passwort',
      loginButton: 'Anmelden',
      registerButton: 'Registrieren',
      username: 'Benutzername',
      confirmPassword: 'Passwort bestätigen',
      dontHaveAccount: 'Noch kein Konto?',
      alreadyHaveAccount: 'Du hast bereits ein Konto?',
      loginLink: 'Einloggen',
      errorPrefix: 'Fehler: ',
      noAccountFound: 'Kein Konto mit dieser E-Mail gefunden',
      incorrectPassword: 'Falsches Passwort',
      emailInvalid: "E-Mail-Format ist ungültig (muss '@' enthalten)",
      passwordTooShort: 'Das Passwort muss länger als 6 Zeichen sein',
      passwordsDontMatch: 'Passwörter stimmen nicht überein',
      emailOrUsernameInUse: 'E-Mail oder Benutzername wird bereits verwendet',
      somethingWentWrong: 'Etwas ist schiefgelaufen, bitte versuche es erneut',
      loginFailed: 'Anmeldung fehlgeschlagen'
    },
    recipes: {
      allRecipes: 'Alle Rezepte',
      addRecipe: '+ Rezept hinzufügen',
      searchLabel: 'Suche',
      qPlaceholder: 'z.B. Tuna (passt zu Titel, Beschreibung, Tags)',
      tagLabel: 'Tag',
      tagPlaceholder: 'z.B. vegan, schnell',
      stapleLabel: 'Beilage',
      mealCategoryLabel: 'Kategorie',
      categoryLabel: 'Kategorie:',
      byLabel: 'Von:',
      allStables: 'Alle Beilagen',
      allCategories: 'Alle Kategorien',
      noRecipesMatch: 'Keine Rezepte passen zu deiner Suche. Bitte andere Stichwörter oder Filter ausprobieren.',
      noRecipesYet: 'Noch keine Rezepte. Sei der Erste!',
      foundOne: '{{count}} Rezept gefunden',
      foundMany: '{{count}} Rezepte gefunden'
    },
    page: {
      likedRecipes: 'Favorisierte Rezepte',
      editRecipe: 'Rezept bearbeiten',
      addNewRecipe: 'Neues Rezept hinzufügen',
      profileEdit: 'Profil bearbeiten',
      notFoundTitle: '404 - Seite nicht gefunden',
      notFoundMessage: 'Das gesuchte Rezept existiert nicht.'
    },
    like: {
      like: 'Gefällt mir',
      unlike: 'Nicht mehr',
      one: 'Like',
      many: 'Likes'
    },
    review: {
      one: 'Bewertung',
      many: 'Bewertungen'
    },
    comments: {
      title: 'Kommentare ({{count}})',
      yourRating: 'Deine Bewertung',
      yourReview: 'Dein Kommentar',
      reviewPlaceholder: 'Teile deine Gedanken zu diesem Rezept...',
      postReview: 'Bewertung posten',
      loginToLeave: 'um eine Bewertung abzugeben.',
      noReviews: 'Noch keine Bewertungen. Sei der Erste!'
    },
    sharing: {
      shareLabel: 'Teilen:',
      twitter: 'Twitter',
      facebook: 'Facebook'
    },
    translation: {
      viewTranslation: 'Übersetzung anzeigen',
      hideTranslation: 'Übersetzung ausblenden',
      languageLabel: 'Übersetzungssprache',
      loading: 'Wird übersetzt...',
      failed: 'Übersetzung fehlgeschlagen. Bitte später erneut versuchen.',
      translatedTitle: 'Übersetzter Titel',
      translatedDescription: 'Übersetzte Beschreibung'
    },
    actions: {
      edit: 'Bearbeiten',
      delete: 'Löschen',
      updateRecipe: 'Rezept aktualisieren',
      createRecipe: 'Rezept erstellen',
      saveChanges: 'Änderungen speichern',
      editProfile: 'Profil bearbeiten',
      cropImage: 'Bild zuschneiden',
      reset: 'Zurücksetzen',
      postReview: 'Bewertung posten',
      replaceImageOptional: 'Bild ersetzen (optional)',
      currentImage: 'Aktuelles Bild: {{image}}'
    },
    categories: {
      Breakfast: 'Frühstück',
      Lunch: 'Mittagessen',
      Dinner: 'Abendessen',
      Dessert: 'Dessert',
      Snack: 'Snack',
      Drink: 'Getränk',
      selectCategory: 'Kategorie auswählen'
    },
    form: {
      descriptionInstructions: 'Beschreibung / Anleitung',
      title: 'Titel',
      categoryLabel: 'Kategorie',
      tagsLabel: 'Tags (kommagetrennt)',
      tagsPlaceholder: 'z.B. vegan, schnell, italienisch',
      recipeImageLabel: 'Rezeptbild',
      fileUploadLabel: 'Bilddatei hochladen',
      fileUploadHelp: 'Wähle eine lokale Bilddatei zum Zuschneiden',
      useImageLink: 'Bildlink verwenden',
      imageLinkLabel: 'Bild-URL',
      imageLinkPlaceholder: 'https://example.com/rezept.jpg',
      loadAndCropButton: 'Laden und zuschneiden',
      imageUrlLoadError: 'Diese Bild-URL konnte nicht geladen werden. Bitte prüfe, ob der Link direkt erreichbar ist.',
      imageUrlCropCorsError: 'Diese Bild-URL kann wegen CORS-Einschränkungen nicht zugeschnitten werden. Bitte nutze eine andere URL oder lade eine Datei hoch.',
      createRecipeButton: 'Rezept erstellen',
      updateRecipeButton: 'Rezept aktualisieren'
    },
    profile: {
      memberSince: 'Mitglied seit:',
      noBioYet: 'Noch kein Bio.',
      recipesBy: 'Rezepte von',
      noRecipesYet: 'Noch keine Rezepte.',
      bio: 'Bio',
      profilePicture: 'Profilbild',
      current: 'Aktuell: {{file}}',
      saveChanges: 'Änderungen speichern'
    },
    liked: {
      empty: 'Du hast noch keine Rezepte geliked.',
      countOne: 'Du magst {{count}} Rezept.',
      countMany: 'Du magst {{count}} Rezepte.'
    },
    footer: {
      copy: '&copy; 2026 Recipe Blog'
    }
  },
  es: {
    home: {
      hello: 'Hello, recipe app'
    },
    nav: {
      recipes: 'Recetas',
      likedRecipes: 'Recetas que te gustan',
      myProfile: 'Mi Perfil',
      login: 'Iniciar sesión',
      register: 'Registrarse',
      logout: 'Cerrar sesión'
    },
    common: {
      search: 'Buscar',
      clear: 'Limpiar',
      backToAllRecipes: 'Volver a todas las recetas',
      backToRecipes: 'Volver a las recetas'
    },
    auth: {
      welcomeBack: 'Bienvenido/a de nuevo',
      createAccount: 'Crear cuenta',
      email: 'Email',
      password: 'Contraseña',
      loginButton: 'Iniciar sesión',
      registerButton: 'Registrarse',
      username: 'Nombre de usuario',
      confirmPassword: 'Confirmar contraseña',
      dontHaveAccount: '¿No tienes una cuenta?',
      alreadyHaveAccount: '¿Ya tienes una cuenta?',
      loginLink: 'Iniciar sesión',
      errorPrefix: 'Error: ',
      noAccountFound: 'No hay cuenta con ese correo electrónico',
      incorrectPassword: 'Contraseña incorrecta',
      emailInvalid: "El formato del email no es válido (debe incluir '@')",
      passwordTooShort: 'La contraseña debe tener más de 6 caracteres',
      passwordsDontMatch: 'Las contraseñas no coinciden',
      emailOrUsernameInUse: 'El email o el nombre de usuario ya está en uso',
      somethingWentWrong: 'Algo salió mal, por favor inténtalo de nuevo',
      loginFailed: 'Error al iniciar sesión'
    },
    recipes: {
      allRecipes: 'Todas las recetas',
      addRecipe: '+ Agregar receta',
      searchLabel: 'Buscar',
      qPlaceholder: 'p. ej. Tuna (coincide con título, descripción, etiquetas)',
      tagLabel: 'Etiqueta',
      tagPlaceholder: 'p. ej. vegano, rápido',
      stapleLabel: 'Ingrediente principal',
      mealCategoryLabel: 'Categoría',
      categoryLabel: 'Categoría:',
      byLabel: 'Por:',
      allStables: 'Todos los ingredientes',
      allCategories: 'Todas las categorías',
      noRecipesMatch: 'No hay recetas que coincidan con tu búsqueda. Prueba otras palabras o filtros.',
      noRecipesYet: 'Aún no hay recetas. ¡Sé el primero en agregar una!',
      foundOne: 'Se encontró {{count}} receta',
      foundMany: 'Se encontraron {{count}} recetas'
    },
    page: {
      likedRecipes: 'Recetas que te gustan',
      editRecipe: 'Editar receta',
      addNewRecipe: 'Agregar nueva receta',
      profileEdit: 'Editar perfil',
      notFoundTitle: '404 - Página no encontrada',
      notFoundMessage: 'La receta que buscas no existe.'
    },
    like: {
      like: 'Me gusta',
      unlike: 'Quitar me gusta',
      one: 'me gusta',
      many: 'me gusta'
    },
    review: {
      one: 'reseña',
      many: 'reseñas'
    },
    comments: {
      title: 'Comentarios ({{count}})',
      yourRating: 'Tu calificación',
      yourReview: 'Tu reseña',
      reviewPlaceholder: 'Comparte tus pensamientos sobre esta receta...',
      postReview: 'Publicar reseña',
      loginToLeave: 'para dejar una reseña.',
      noReviews: 'Aún no hay reseñas. ¡Sé el primero!'
    },
    sharing: {
      shareLabel: 'Compartir:',
      twitter: 'Twitter',
      facebook: 'Facebook'
    },
    translation: {
      viewTranslation: 'Ver traducción',
      hideTranslation: 'Ocultar traducción',
      languageLabel: 'Idioma de traducción',
      loading: 'Traduciendo...',
      failed: 'La traducción falló. Inténtalo de nuevo más tarde.',
      translatedTitle: 'Título traducido',
      translatedDescription: 'Descripción traducida'
    },
    actions: {
      edit: 'Editar',
      delete: 'Eliminar',
      updateRecipe: 'Actualizar receta',
      createRecipe: 'Crear receta',
      saveChanges: 'Guardar cambios',
      editProfile: 'Editar perfil',
      cropImage: 'Recortar imagen',
      reset: 'Restablecer',
      postReview: 'Publicar reseña',
      replaceImageOptional: 'Reemplazar imagen (opcional)',
      currentImage: 'Imagen actual: {{image}}'
    },
    categories: {
      Breakfast: 'Desayuno',
      Lunch: 'Almuerzo',
      Dinner: 'Cena',
      Dessert: 'Postre',
      Snack: 'Snack',
      Drink: 'Bebida',
      selectCategory: 'Selecciona una categoría'
    },
    form: {
      descriptionInstructions: 'Descripción / Instrucciones',
      title: 'Título',
      categoryLabel: 'Categoría',
      tagsLabel: 'Etiquetas (separadas por comas)',
      tagsPlaceholder: 'p. ej. vegano, rápido, italiano',
      recipeImageLabel: 'Imagen de la receta',
      fileUploadLabel: 'Subir archivo de imagen',
      fileUploadHelp: 'Selecciona un archivo de imagen local para recortar',
      useImageLink: 'Usar enlace de imagen',
      imageLinkLabel: 'URL de la imagen',
      imageLinkPlaceholder: 'https://example.com/receta.jpg',
      loadAndCropButton: 'Cargar y recortar',
      imageUrlLoadError: 'No se pudo cargar esta URL de imagen. Verifica que el enlace sea de acceso directo.',
      imageUrlCropCorsError: 'Esta URL de imagen no se puede recortar por restricciones de CORS. Prueba otra URL o sube un archivo.',
      createRecipeButton: 'Crear receta',
      updateRecipeButton: 'Actualizar receta'
    },
    profile: {
      memberSince: 'Miembro desde:',
      noBioYet: 'Aún no hay biografía.',
      recipesBy: 'Recetas de',
      noRecipesYet: 'Aún no hay recetas.',
      bio: 'Biografía',
      profilePicture: 'Foto de perfil',
      current: 'Actual: {{file}}',
      saveChanges: 'Guardar cambios'
    },
    liked: {
      empty: 'Aún no has dado me gusta a ninguna receta.',
      countOne: 'Te gustó {{count}} receta.',
      countMany: 'Te gustaron {{count}} recetas.'
    },
    footer: {
      copy: '&copy; 2026 Recipe Blog'
    }
  },
  zh: {
    home: {
      hello: 'Hello, recipe app'
    },
    nav: {
      recipes: '食谱',
      likedRecipes: '我喜欢的食谱',
      myProfile: '我的资料',
      login: '登录',
      register: '注册',
      logout: '退出登录'
    },
    common: {
      search: '搜索',
      clear: '清除',
      backToAllRecipes: '返回所有食谱',
      backToRecipes: '返回食谱'
    },
    auth: {
      welcomeBack: '欢迎回来',
      createAccount: '创建账号',
      email: '邮箱',
      password: '密码',
      loginButton: '登录',
      registerButton: '注册',
      username: '用户名',
      confirmPassword: '确认密码',
      dontHaveAccount: '还没有账号吗？',
      alreadyHaveAccount: '已有账号？',
      loginLink: '登录',
      errorPrefix: '错误：',
      noAccountFound: '该邮箱对应的账号不存在',
      incorrectPassword: '密码错误',
      emailInvalid: "邮箱格式不正确（必须包含 '@'）",
      passwordTooShort: '密码长度必须大于 6 个字符',
      passwordsDontMatch: '两次输入的密码不一致',
      emailOrUsernameInUse: '邮箱或用户名已被使用',
      somethingWentWrong: '出现问题，请稍后再试',
      loginFailed: '登录失败'
    },
    recipes: {
      allRecipes: '全部食谱',
      addRecipe: '+ 添加食谱',
      searchLabel: '搜索',
      qPlaceholder: '例如：金枪鱼（匹配标题/描述/标签）',
      tagLabel: '标签',
      tagPlaceholder: '例如：素食，快速',
      stapleLabel: '主食',
      mealCategoryLabel: '餐类',
      categoryLabel: '类别：',
      byLabel: '作者：',
      allStables: '全部主食',
      allCategories: '全部餐类',
      noRecipesMatch: '没有食谱匹配你的搜索。请尝试更换关键词或筛选条件。',
      noRecipesYet: '还没有食谱。成为第一个吧！',
      foundOne: '找到 {{count}} 个食谱',
      foundMany: '找到 {{count}} 个食谱'
    },
    page: {
      likedRecipes: '我喜欢的食谱',
      editRecipe: '编辑食谱',
      addNewRecipe: '添加新食谱',
      profileEdit: '编辑资料',
      notFoundTitle: '404 - 页面未找到',
      notFoundMessage: '你找的食谱不存在。'
    },
    like: {
      like: '喜欢',
      unlike: '取消喜欢',
      one: '喜欢',
      many: '喜欢'
    },
    review: {
      one: '评价',
      many: '评价'
    },
    comments: {
      title: '评论（{{count}}）',
      yourRating: '你的评分',
      yourReview: '你的评价',
      reviewPlaceholder: '分享你对这个食谱的想法…',
      postReview: '发布评价',
      loginToLeave: '以发表评论。',
      noReviews: '还没有评价。成为第一个吧！'
    },
    sharing: {
      shareLabel: '分享：',
      twitter: 'Twitter',
      facebook: 'Facebook'
    },
    translation: {
      viewTranslation: '查看翻译',
      hideTranslation: '隐藏翻译',
      languageLabel: '翻译语言',
      loading: '正在翻译...',
      failed: '翻译失败，请稍后重试。',
      translatedTitle: '翻译标题',
      translatedDescription: '翻译描述'
    },
    actions: {
      edit: '编辑',
      delete: '删除',
      updateRecipe: '更新食谱',
      createRecipe: '创建食谱',
      saveChanges: '保存更改',
      editProfile: '编辑资料',
      cropImage: '裁剪图片',
      reset: '重置',
      postReview: '发布评价',
      replaceImageOptional: '替换图片（可选）',
      currentImage: '当前图片：{{image}}'
    },
    categories: {
      Breakfast: '早餐',
      Lunch: '午餐',
      Dinner: '晚餐',
      Dessert: '甜点',
      Snack: '小吃',
      Drink: '饮品',
      selectCategory: '选择餐类'
    },
    form: {
      descriptionInstructions: '描述 / 使用说明',
      title: '标题',
      categoryLabel: '餐类',
      tagsLabel: '标签（逗号分隔）',
      tagsPlaceholder: '例如：素食，快速，意大利',
      recipeImageLabel: '食谱图片',
      fileUploadLabel: '上传图片文件',
      fileUploadHelp: '选择本地图片文件后可裁剪',
      useImageLink: '使用图片链接',
      imageLinkLabel: '图片链接',
      imageLinkPlaceholder: 'https://example.com/recipe.jpg',
      loadAndCropButton: '加载并裁剪',
      imageUrlLoadError: '图片链接无法加载，请确认该链接可直接访问。',
      imageUrlCropCorsError: '该图片链接不允许裁剪（跨域限制），请更换链接或改用文件上传。',
      createRecipeButton: '创建食谱',
      updateRecipeButton: '更新食谱'
    },
    profile: {
      memberSince: '加入时间：',
      noBioYet: '暂无简介。',
      recipesBy: '的食谱',
      noRecipesYet: '暂无食谱。',
      bio: '简介',
      profilePicture: '头像',
      current: '当前：{{file}}',
      saveChanges: '保存更改'
    },
    liked: {
      empty: '你还没有喜欢任何食谱。',
      countOne: '你喜欢 {{count}} 个食谱。',
      countMany: '你喜欢 {{count}} 个食谱。'
    },
    footer: {
      copy: '&copy; 2026 Recipe Blog'
    }
  }
};

const SUPPORTED_LOCALES = new Set(['en', 'de', 'es', 'zh']);

function normalizeLang(lang) {
  if (!lang) return 'en';
  if (SUPPORTED_LOCALES.has(lang)) return lang;
  return 'en';
}

function getByPath(obj, path) {
  return path.split('.').reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined), obj);
}

function interpolate(template, params) {
  if (!params) return template;
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => (params[key] !== undefined ? String(params[key]) : ''));
}

function t(locale, key, params) {
  const lang = normalizeLang(locale);
  const dict = getByPath(TRANSLATIONS[lang], key);
  const fallback = getByPath(TRANSLATIONS.en, key);
  const template = dict !== undefined ? dict : fallback;
  if (typeof template !== 'string') return key;
  return interpolate(template, params);
}

module.exports = {
  TRANSLATIONS,
  SUPPORTED_LOCALES: Array.from(SUPPORTED_LOCALES),
  normalizeLang,
  t
};

