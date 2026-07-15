const TRANSLATIONS = {
  en: {
    home: {
      hello: 'Hello, recipe app'
    },
    nav: {
      recipes: 'Recipes',
      likedRecipes: 'Like',
      myProfile: 'My Profile',
      login: 'Login',
      register: 'Register',
      logout: 'Logout',
      contactUs: 'Contact Us',
      leaderboard: 'Leaderboard',
      myFridge: 'My Fridge'
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
      emailOptional: 'Email (Optional)',
      emailOrPhone: 'Email, Phone, or Username',
      emailOrPhonePlaceholder: 'Enter email, full phone number, or username',
      phone: 'Phone Number',
      phoneOptional: 'Phone (Optional)',
      phonePlaceholder: 'Enter your phone number',
      password: 'Password',
      loginButton: 'Login',
      registerButton: 'Register',
      username: 'Username',
      confirmPassword: 'Confirm Password',
      loginMethodHint: 'If logging in with a phone number, include the country code (e.g. +86).',
      registerContactHint: 'Register with either email or phone number.',
      dontHaveAccount: "Don't have an account?",
      alreadyHaveAccount: 'Already have an account?',
      loginLink: 'Log in',
      errorPrefix: 'Error: ',
      noAccountFound: 'No account found with that email, phone, or username',
      incorrectPassword: 'Incorrect password',
      emailInvalid: "Email format is invalid (must include '@')",
      contactRequired: 'Please provide at least an email or a phone number',
      phoneRequired: 'Phone number is required',
      phoneInvalid: 'Phone number length does not match the selected country/region',
      phoneCountryCodeInvalid: 'Please select a valid country calling code',
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
      foundMany: '{{count}} recipes found',
      requiredIngredients: 'Required Ingredients',
      noIngredientsYet: 'No ingredients listed yet.'
    },
    page: {
      likedRecipes: 'My Liked Recipes',
      editRecipe: 'Edit Recipe',
      addNewRecipe: 'Add New Recipe',
      profileEdit: 'Edit Profile',
      notFoundTitle: '404 - Page Not Found',
      notFoundMessage: "The recipe you're looking for doesn't exist.",
      leaderboard: 'Leaderboard'
    },
    leaderboard: {
      tabRecipes: 'Recipe Leaderboard',
      tabContributors: 'Contributor Leaderboard',
      subtitle: 'This ranking is sorted by recipe likes from highest to lowest.',
      contributorsSubtitle: 'This ranking is sorted by the number of recipes each author has contributed.',
      empty: 'No recipes on the leaderboard yet.',
      contributorsEmpty: 'No contributors on the leaderboard yet.',
      colRank: 'Rank',
      colAuthor: 'Author',
      colCount: 'Contributions',
      colRecipes: 'Contributed Recipes',
      recipeCount: '{{count}}',
      expandMore: 'View more'
    },
    like: {
      like: 'Like',
      unlike: 'Unlike',
      one: 'like',
      many: 'likes',
      loginPromptTitle: 'Like this recipe',
      loginPrompt: "You're not logged in yet. Please log in to leave your like!"
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
      facebook: 'Facebook',
      wechat: 'WeChat',
      wechatTitle: 'Share to WeChat',
      wechatHintDesktop: 'Scan this QR code with WeChat on your phone to open the recipe, then forward it to friends or share on Moments.',
      wechatHintMobile: 'Copy the link below, open WeChat, and paste it into a chat or Moments.',
      copyLink: 'Copy link',
      linkCopied: 'Link copied!'
    },
    translation: {
      viewTranslation: 'View Translation',
      hideTranslation: 'Hide Translation',
      languageLabel: 'Translation language',
      loading: 'Translating...',
      failed: 'Translation failed. Please try again later.',
      translatedTitle: 'Translated title',
      translatedDescription: 'Translated description',
      translatedComment: 'Translated comment'
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
    staples: {
      Rice: 'Rice',
      Noodle: 'Noodle',
      Pasta: 'Pasta',
      Bread: 'Bread',
      Potato: 'Potato',
      Quinoa: 'Quinoa',
      Couscous: 'Couscous'
    },
    form: {
      descriptionInstructions: 'Description / Instructions',
      ingredientsLabel: 'Required Ingredients',
      ingredientsPlaceholder: 'One ingredient per line, e.g.\nChicken breast\nTomato\nSalt',
      extractIngredientsButton: 'Extract from description',
      extractIngredientsEmpty: 'Please fill in the description first.',
      extractIngredientsNone: 'No ingredients were found in the description.',
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
      recipesBy: 'Recipes by {{username}}',
      likedRecipesBy: 'Liked recipes by {{username}}',
      likedRecipesHidden: 'This user has hidden this section.',
      noRecipesYet: 'No recipes yet.',
      noLikedRecipesYet: "This user hasn't saved any recipes yet.",
      bio: 'Bio',
      profilePicture: 'Profile Picture',
      current: 'Current: {{file}}',
      saveChanges: 'Save Changes',
      usernameRequired: 'Username is required'
    },
    liked: {
      empty: 'You have not liked any recipes yet.',
      countOne: 'You liked {{count}} recipe.',
      countMany: 'You liked {{count}} recipes.',
      showOnProfile: 'Visible on my profile to others'
    },
    footer: {
      copy: '&copy; 2026 Recipe Blog'
    },
    contact: {
      formTitle: 'Feedback',
      nameLabel: 'Name',
      contactLabel: 'Email / Phone',
      messageLabel: 'Brief Description',
      submitButton: 'Submit',
      successMessage: 'Thank you! Your message has been sent successfully.',
      nameRequired: 'Please enter your name.',
      contactRequired: 'Please enter your email or phone number.',
      messageRequired: 'Please briefly describe your issue.',
      mailNotConfigured: 'Email service is not configured yet. Please try again later.',
      sendFailed: 'Failed to send your message. Please try again later.'
    },
    fridge: {
      title: 'My Fridge',
      ignoreLabel: 'Ignore when matching',
      ignorePlaceholder: 'Already ignoring oil, salt, sugar, light soy sauce, vinegar',
      addIngredientLabel: 'Add ingredient',
      addIngredientPlaceholder: 'e.g. tomato',
      emptyFridge: 'No ingredients yet. Add some above.',
      removeIngredient: 'Remove ingredient',
      matchButton: 'Match Recipes',
      matchHint: 'Add ingredients on the left, then click match to see recipes.',
      groupPerfect: 'Perfect',
      groupAlmost: 'Almost there',
      groupInspiration: 'Inspiration',
      matchScore: 'Match {{score}}%',
      missingPrefix: 'Missing: ',
      noResults: 'No recipes matched at 30% or above. Try adding more ingredients.'
    }
  },
  de: {
    home: {
      hello: 'Hello, recipe app'
    },
    nav: {
      recipes: 'Rezepte',
      likedRecipes: 'Gefällt mir',
      myProfile: 'Mein Profil',
      login: 'Anmelden',
      register: 'Registrieren',
      logout: 'Abmelden',
      contactUs: 'Kontakt',
      leaderboard: 'Rangliste',
      myFridge: 'Mein Kühlschrank'
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
      emailOptional: 'E-Mail (Optional)',
      emailOrPhone: 'E-Mail, Telefonnummer oder Benutzername',
      emailOrPhonePlaceholder: 'E-Mail, vollständige Telefonnummer oder Benutzername eingeben',
      phone: 'Telefonnummer',
      phoneOptional: 'Telefon (Optional)',
      phonePlaceholder: 'Gib deine Telefonnummer ein',
      password: 'Passwort',
      loginButton: 'Anmelden',
      registerButton: 'Registrieren',
      username: 'Benutzername',
      confirmPassword: 'Passwort bestätigen',
      loginMethodHint: 'Wenn du dich mit einer Telefonnummer anmeldest, gib bitte die Ländervorwahl an (z. B. +86).',
      registerContactHint: 'Registrierung mit E-Mail oder Telefonnummer – eines von beiden reicht.',
      dontHaveAccount: 'Noch kein Konto?',
      alreadyHaveAccount: 'Du hast bereits ein Konto?',
      loginLink: 'Einloggen',
      errorPrefix: 'Fehler: ',
      noAccountFound: 'Kein Konto mit dieser E-Mail, Telefonnummer oder diesem Benutzernamen gefunden',
      incorrectPassword: 'Falsches Passwort',
      emailInvalid: "E-Mail-Format ist ungültig (muss '@' enthalten)",
      contactRequired: 'Bitte gib mindestens eine E-Mail oder Telefonnummer an',
      phoneRequired: 'Telefonnummer ist erforderlich',
      phoneInvalid: 'Die Länge der Telefonnummer passt nicht zum gewählten Land/der Region',
      phoneCountryCodeInvalid: 'Bitte wähle eine gültige Ländervorwahl',
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
      foundMany: '{{count}} Rezepte gefunden',
      requiredIngredients: 'Benötigte Zutaten',
      noIngredientsYet: 'Noch keine Zutaten angegeben.'
    },
    page: {
      likedRecipes: 'Meine favorisierten Rezepte',
      editRecipe: 'Rezept bearbeiten',
      addNewRecipe: 'Neues Rezept hinzufügen',
      profileEdit: 'Profil bearbeiten',
      notFoundTitle: '404 - Seite nicht gefunden',
      notFoundMessage: 'Das gesuchte Rezept existiert nicht.',
      leaderboard: 'Rangliste'
    },
    leaderboard: {
      tabRecipes: 'Rezept-Rangliste',
      tabContributors: 'Beitrags-Rangliste',
      subtitle: 'Diese Rangliste ist nach der Anzahl der Likes sortiert (höchste zuerst).',
      contributorsSubtitle: 'Diese Rangliste sortiert Autoren nach der Anzahl ihrer beigetragenen Rezepte.',
      empty: 'Noch keine Rezepte in der Rangliste.',
      contributorsEmpty: 'Noch keine Beiträge in der Rangliste.',
      colRank: 'Rang',
      colAuthor: 'Autor',
      colCount: 'Beiträge',
      colRecipes: 'Beigetragene Rezepte',
      recipeCount: '{{count}}',
      expandMore: 'Mehr anzeigen'
    },
    like: {
      like: 'Gefällt mir',
      unlike: 'Nicht mehr',
      one: 'Like',
      many: 'Likes',
      loginPromptTitle: 'Rezept liken',
      loginPrompt: 'Du bist noch nicht angemeldet. Bitte melde dich an, um dein Like zu hinterlassen!'
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
      facebook: 'Facebook',
      wechat: 'WeChat',
      wechatTitle: 'Über WeChat teilen',
      wechatHintDesktop: 'Scannen Sie diesen QR-Code mit WeChat auf Ihrem Handy, um das Rezept zu öffnen und an Freunde oder Momente weiterzuleiten.',
      wechatHintMobile: 'Kopieren Sie den Link unten, öffnen Sie WeChat und fügen Sie ihn in einen Chat oder in Momente ein.',
      copyLink: 'Link kopieren',
      linkCopied: 'Link kopiert!'
    },
    translation: {
      viewTranslation: 'Übersetzung anzeigen',
      hideTranslation: 'Übersetzung ausblenden',
      languageLabel: 'Übersetzungssprache',
      loading: 'Wird übersetzt...',
      failed: 'Übersetzung fehlgeschlagen. Bitte später erneut versuchen.',
      translatedTitle: 'Übersetzter Titel',
      translatedDescription: 'Übersetzte Beschreibung',
      translatedComment: 'Übersetzter Kommentar'
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
    staples: {
      Rice: 'Reis',
      Noodle: 'Nudeln',
      Pasta: 'Pasta',
      Bread: 'Brot',
      Potato: 'Kartoffel',
      Quinoa: 'Quinoa',
      Couscous: 'Couscous'
    },
    form: {
      descriptionInstructions: 'Beschreibung / Anleitung',
      ingredientsLabel: 'Benötigte Zutaten',
      ingredientsPlaceholder: 'Eine Zutat pro Zeile, z. B.\nHähnchenbrust\nTomate\nSalz',
      extractIngredientsButton: 'Aus Beschreibung extrahieren',
      extractIngredientsEmpty: 'Bitte zuerst die Beschreibung ausfüllen.',
      extractIngredientsNone: 'In der Beschreibung wurden keine Zutaten erkannt.',
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
      recipesBy: 'Rezepte von {{username}}',
      likedRecipesBy: 'Favorisierte Rezepte von {{username}}',
      likedRecipesHidden: 'Dieser Benutzer hat diesen Bereich ausgeblendet.',
      noRecipesYet: 'Noch keine Rezepte.',
      noLikedRecipesYet: 'Dieser Benutzer hat noch keine Rezepte gespeichert.',
      bio: 'Bio',
      profilePicture: 'Profilbild',
      current: 'Aktuell: {{file}}',
      saveChanges: 'Änderungen speichern',
      usernameRequired: 'Benutzername ist erforderlich'
    },
    liked: {
      empty: 'Du hast noch keine Rezepte geliked.',
      countOne: 'Du magst {{count}} Rezept.',
      countMany: 'Du magst {{count}} Rezepte.',
      showOnProfile: 'Für andere auf meinem Profil sichtbar'
    },
    footer: {
      copy: '&copy; 2026 Recipe Blog'
    },
    contact: {
      formTitle: 'Feedback',
      nameLabel: 'Name',
      contactLabel: 'E-Mail / Telefon',
      messageLabel: 'Kurzbeschreibung',
      submitButton: 'Absenden',
      successMessage: 'Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet.',
      nameRequired: 'Bitte geben Sie Ihren Namen ein.',
      contactRequired: 'Bitte geben Sie Ihre E-Mail oder Telefonnummer ein.',
      messageRequired: 'Bitte beschreiben Sie Ihr Anliegen kurz.',
      mailNotConfigured: 'Der E-Mail-Dienst ist noch nicht konfiguriert. Bitte versuchen Sie es später erneut.',
      sendFailed: 'Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es später erneut.'
    },
    fridge: {
      title: 'Mein Kühlschrank',
      ignoreLabel: 'Beim Abgleich ignorieren',
      ignorePlaceholder: 'Bereits ignoriert: Öl, Salz, Zucker, helle Sojasauce, Essig',
      addIngredientLabel: 'Zutat hinzufügen',
      addIngredientPlaceholder: 'z. B. Tomate',
      emptyFridge: 'Noch keine Zutaten. Oben hinzufügen.',
      removeIngredient: 'Zutat entfernen',
      matchButton: 'Rezepte abgleichen',
      matchHint: 'Links Zutaten hinzufügen, dann auf Abgleichen klicken.',
      groupPerfect: 'Perfekt',
      groupAlmost: 'Fast geschafft',
      groupInspiration: 'Inspiration',
      matchScore: 'Übereinstimmung {{score}} %',
      missingPrefix: 'Fehlt: ',
      noResults: 'Keine Rezepte mit mindestens 30 % Übereinstimmung. Füge mehr Zutaten hinzu.'
    }
  },
  es: {
    home: {
      hello: 'Hello, recipe app'
    },
    nav: {
      recipes: 'Recetas',
      likedRecipes: 'Me gusta',
      myProfile: 'Mi Perfil',
      login: 'Iniciar sesión',
      register: 'Registrarse',
      logout: 'Cerrar sesión',
      contactUs: 'Contáctanos',
      leaderboard: 'Ranking',
      myFridge: 'Mi nevera'
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
      emailOptional: 'Email (Optional)',
      emailOrPhone: 'Email, teléfono o nombre de usuario',
      emailOrPhonePlaceholder: 'Ingresa email, número completo de teléfono o nombre de usuario',
      phone: 'Número de teléfono',
      phoneOptional: 'Phone (Optional)',
      phonePlaceholder: 'Ingresa tu número de teléfono',
      password: 'Contraseña',
      loginButton: 'Iniciar sesión',
      registerButton: 'Registrarse',
      username: 'Nombre de usuario',
      confirmPassword: 'Confirmar contraseña',
      loginMethodHint: 'Si inicias sesión con un número de teléfono, incluye el código de país (p. ej., +86).',
      registerContactHint: 'Regístrate con correo o teléfono; solo necesitas uno.',
      dontHaveAccount: '¿No tienes una cuenta?',
      alreadyHaveAccount: '¿Ya tienes una cuenta?',
      loginLink: 'Iniciar sesión',
      errorPrefix: 'Error: ',
      noAccountFound: 'No hay cuenta con ese correo electrónico, número de teléfono o nombre de usuario',
      incorrectPassword: 'Contraseña incorrecta',
      emailInvalid: "El formato del email no es válido (debe incluir '@')",
      contactRequired: 'Proporciona al menos un correo electrónico o un número de teléfono',
      phoneRequired: 'El número de teléfono es obligatorio',
      phoneInvalid: 'La longitud del número no coincide con el país o región seleccionados',
      phoneCountryCodeInvalid: 'Selecciona un código de país válido',
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
      foundMany: 'Se encontraron {{count}} recetas',
      requiredIngredients: 'Ingredientes necesarios',
      noIngredientsYet: 'Aún no hay ingredientes indicados.'
    },
    page: {
      likedRecipes: 'Mis recetas favoritas',
      editRecipe: 'Editar receta',
      addNewRecipe: 'Agregar nueva receta',
      profileEdit: 'Editar perfil',
      notFoundTitle: '404 - Página no encontrada',
      notFoundMessage: 'La receta que buscas no existe.',
      leaderboard: 'Ranking'
    },
    leaderboard: {
      tabRecipes: 'Ranking de recetas',
      tabContributors: 'Ranking de contribuciones',
      subtitle: 'Este ranking se ordena por cantidad de me gusta, de mayor a menor.',
      contributorsSubtitle: 'Este ranking ordena a los autores según la cantidad de recetas que han aportado.',
      empty: 'Aún no hay recetas en el ranking.',
      contributorsEmpty: 'Aún no hay contribuciones en el ranking.',
      colRank: 'Puesto',
      colAuthor: 'Autor',
      colCount: 'Contribuciones',
      colRecipes: 'Recetas aportadas',
      recipeCount: '{{count}}',
      expandMore: 'Ver más'
    },
    like: {
      like: 'Me gusta',
      unlike: 'Quitar me gusta',
      one: 'me gusta',
      many: 'me gusta',
      loginPromptTitle: 'Me gusta esta receta',
      loginPrompt: 'Aún no has iniciado sesión. ¡Inicia sesión para dejar tu me gusta!'
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
      facebook: 'Facebook',
      wechat: 'WeChat',
      wechatTitle: 'Compartir en WeChat',
      wechatHintDesktop: 'Escanee este código QR con WeChat en su móvil para abrir la receta y compartirla con amigos o en Momentos.',
      wechatHintMobile: 'Copie el enlace de abajo, abra WeChat y péguelo en un chat o en Momentos.',
      copyLink: 'Copiar enlace',
      linkCopied: '¡Enlace copiado!'
    },
    translation: {
      viewTranslation: 'Ver traducción',
      hideTranslation: 'Ocultar traducción',
      languageLabel: 'Idioma de traducción',
      loading: 'Traduciendo...',
      failed: 'La traducción falló. Inténtalo de nuevo más tarde.',
      translatedTitle: 'Título traducido',
      translatedDescription: 'Descripción traducida',
      translatedComment: 'Comentario traducido'
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
    staples: {
      Rice: 'Arroz',
      Noodle: 'Fideos',
      Pasta: 'Pasta',
      Bread: 'Pan',
      Potato: 'Patata',
      Quinoa: 'Quinoa',
      Couscous: 'Cuscús'
    },
    form: {
      descriptionInstructions: 'Descripción / Instrucciones',
      ingredientsLabel: 'Ingredientes necesarios',
      ingredientsPlaceholder: 'Un ingrediente por línea, p. ej.\nPechuga de pollo\nTomate\nSal',
      extractIngredientsButton: 'Extraer de la descripción',
      extractIngredientsEmpty: 'Primero complete la descripción.',
      extractIngredientsNone: 'No se encontraron ingredientes en la descripción.',
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
      recipesBy: 'Recetas de {{username}}',
      likedRecipesBy: 'Recetas que le gustan a {{username}}',
      likedRecipesHidden: 'Este usuario ha ocultado esta sección.',
      noRecipesYet: 'Aún no hay recetas.',
      noLikedRecipesYet: 'Este usuario no ha guardado ninguna receta.',
      bio: 'Biografía',
      profilePicture: 'Foto de perfil',
      current: 'Actual: {{file}}',
      saveChanges: 'Guardar cambios',
      usernameRequired: 'El nombre de usuario es obligatorio'
    },
    liked: {
      empty: 'Aún no has dado me gusta a ninguna receta.',
      countOne: 'Te gustó {{count}} receta.',
      countMany: 'Te gustaron {{count}} recetas.',
      showOnProfile: 'Visible en mi perfil para otros'
    },
    footer: {
      copy: '&copy; 2026 Recipe Blog'
    },
    contact: {
      formTitle: 'Enviar comentarios',
      nameLabel: 'Nombre',
      contactLabel: 'Correo / Teléfono',
      messageLabel: 'Descripción breve',
      submitButton: 'Enviar',
      successMessage: '¡Gracias! Su mensaje se envió correctamente.',
      nameRequired: 'Por favor ingrese su nombre.',
      contactRequired: 'Por favor ingrese su correo o teléfono.',
      messageRequired: 'Por favor describa brevemente su problema.',
      mailNotConfigured: 'El servicio de correo aún no está configurado. Inténtelo más tarde.',
      sendFailed: 'No se pudo enviar su mensaje. Inténtelo más tarde.'
    },
    fridge: {
      title: 'Mi nevera',
      ignoreLabel: 'Ignorar al emparejar',
      ignorePlaceholder: 'Ya ignorado: aceite, sal, azúcar, salsa de soja clara, vinagre',
      addIngredientLabel: 'Agregar ingrediente',
      addIngredientPlaceholder: 'p. ej. tomate',
      emptyFridge: 'Aún no hay ingredientes. Agrega arriba.',
      removeIngredient: 'Eliminar ingrediente',
      matchButton: 'Emparejar recetas',
      matchHint: 'Agrega ingredientes a la izquierda y pulsa emparejar.',
      groupPerfect: 'Perfecto',
      groupAlmost: 'Casi listo',
      groupInspiration: 'Inspiración',
      matchScore: 'Coincidencia {{score}} %',
      missingPrefix: 'Falta: ',
      noResults: 'No hay recetas con 30 % o más. Prueba agregando más ingredientes.'
    }
  },
  zh: {
    home: {
      hello: 'Hello, recipe app'
    },
    nav: {
      recipes: '食谱',
      likedRecipes: '喜欢',
      myProfile: '我的主页',
      login: '登录',
      register: '注册',
      logout: '退出登录',
      contactUs: '联系我们',
      leaderboard: '排行榜',
      myFridge: '我的冰箱'
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
      emailOptional: 'Email (Optional)',
      emailOrPhone: '邮箱、手机号或用户名',
      emailOrPhonePlaceholder: '请输入邮箱、完整手机号或用户名',
      phone: '手机号',
      phoneOptional: 'Phone (Optional)',
      phonePlaceholder: '请输入手机号',
      password: '密码',
      loginButton: '登录',
      registerButton: '注册',
      username: '用户名',
      confirmPassword: '确认密码',
      loginMethodHint: '若使用手机号登录，请带上区号，例如：+86。',
      registerContactHint: '支持邮箱和手机号二选一注册',
      dontHaveAccount: '还没有账号吗？',
      alreadyHaveAccount: '已有账号？',
      loginLink: '登录',
      errorPrefix: '错误：',
      noAccountFound: '该邮箱、手机号或用户名对应的账号不存在',
      incorrectPassword: '密码错误',
      emailInvalid: "邮箱格式不正确（必须包含 '@'）",
      contactRequired: '请至少填写邮箱或手机号中的一种',
      phoneRequired: '手机号不能为空',
      phoneInvalid: '手机号位数与所选国家/地区规则不匹配',
      phoneCountryCodeInvalid: '请选择有效的国家区号',
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
      foundMany: '找到 {{count}} 个食谱',
      requiredIngredients: '所需食材',
      noIngredientsYet: '暂无食材信息。'
    },
    page: {
      likedRecipes: '我喜欢的食谱',
      editRecipe: '编辑食谱',
      addNewRecipe: '添加新食谱',
      profileEdit: '编辑资料',
      notFoundTitle: '404 - 页面未找到',
      notFoundMessage: '你找的食谱不存在。',
      leaderboard: '排行榜'
    },
    leaderboard: {
      tabRecipes: '食谱排行榜',
      tabContributors: '食谱贡献榜',
      subtitle: '此排行榜根据食谱的喜欢数量由高到低排行',
      contributorsSubtitle: '此排行榜根据作者贡献食谱数量进行排行',
      empty: '暂无食谱上榜。',
      contributorsEmpty: '暂无作者上榜。',
      colRank: '排行',
      colAuthor: '作者',
      colCount: '贡献数量',
      colRecipes: '贡献食谱',
      recipeCount: '{{count}}',
      expandMore: '展开更多'
    },
    like: {
      like: '喜欢',
      unlike: '取消喜欢',
      one: '喜欢',
      many: '喜欢',
      loginPromptTitle: '喜欢食谱',
      loginPrompt: '还未登录，请登录后留下你的喜欢吧！'
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
      facebook: 'Facebook',
      wechat: '微信',
      wechatTitle: '微信分享',
      wechatHintDesktop: '打开手机微信扫一扫，即可在手机上打开该食谱，并转发给好友或分享到朋友圈。',
      wechatHintMobile: '复制下方链接，打开微信粘贴发送，或分享到朋友圈。',
      copyLink: '复制链接',
      linkCopied: '链接已复制！'
    },
    translation: {
      viewTranslation: '查看翻译',
      hideTranslation: '隐藏翻译',
      languageLabel: '翻译语言',
      loading: '正在翻译...',
      failed: '翻译失败，请稍后重试。',
      translatedTitle: '翻译标题',
      translatedDescription: '翻译描述',
      translatedComment: '翻译评论'
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
    staples: {
      Rice: '米饭',
      Noodle: '面条',
      Pasta: '意面',
      Bread: '面包',
      Potato: '土豆',
      Quinoa: '藜麦',
      Couscous: '北非小米'
    },
    form: {
      descriptionInstructions: '描述 / 使用说明',
      ingredientsLabel: '所需食材',
      ingredientsPlaceholder: '每行填写一种食材，例如：\n鸡胸肉\n番茄\n盐',
      extractIngredientsButton: '根据描述匹配',
      extractIngredientsEmpty: '请先在上方填写描述。',
      extractIngredientsNone: '未能从描述中识别到食材。',
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
      recipesBy: '{{username}}的食谱',
      likedRecipesBy: '{{username}}喜欢的食谱',
      likedRecipesHidden: '该用户隐藏了这部分。',
      noRecipesYet: '暂无食谱。',
      noLikedRecipesYet: '该用户没有收藏任何食谱哦',
      bio: '简介',
      profilePicture: '头像',
      current: '当前：{{file}}',
      saveChanges: '保存更改',
      usernameRequired: '用户名不能为空'
    },
    liked: {
      empty: '你还没有喜欢任何食谱。',
      countOne: '你喜欢 {{count}} 个食谱。',
      countMany: '你喜欢 {{count}} 个食谱。',
      showOnProfile: '他人可否在我的主页中看到'
    },
    footer: {
      copy: '&copy; 2026 Recipe Blog'
    },
    contact: {
      formTitle: '意见提交',
      nameLabel: '姓名',
      contactLabel: '邮箱 / 电话',
      messageLabel: '问题简述',
      submitButton: '提交',
      successMessage: '感谢您的留言，我们已成功收到！',
      nameRequired: '请填写姓名。',
      contactRequired: '请填写邮箱或电话。',
      messageRequired: '请简述您的问题。',
      mailNotConfigured: '邮件服务尚未配置，请稍后再试。',
      sendFailed: '发送失败，请稍后再试。'
    },
    fridge: {
      title: '我的冰箱',
      ignoreLabel: '匹配时忽略',
      ignorePlaceholder: '已忽略油盐糖生抽醋',
      addIngredientLabel: '添加食材',
      addIngredientPlaceholder: '例如：番茄',
      emptyFridge: '还没有食材，请在上方添加。',
      removeIngredient: '移除食材',
      matchButton: '匹配食谱',
      matchHint: '在左侧添加食材后，点击匹配查看食谱。',
      groupPerfect: '完美',
      groupAlmost: '缺一点',
      groupInspiration: '灵感',
      matchScore: '匹配度 {{score}}%',
      missingPrefix: '缺少：',
      noResults: '没有匹配度达到 30% 以上的菜谱，请多添加一些食材。'
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

