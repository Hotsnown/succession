export function renderOrdres(ordre: OrdreData) {

    const { descendants, ascendantsPrivilégiés, collatérauxPrivilégiés, ascendants, collatéraux } = ordre
    
    return (
        `
        Les ordres sont des groupes de personne catégorisés selon la nature du lien qui les unit au de cujus. Les héritiers d'un ordre préférable excluent ceux d'un ordre subséquent

        Il y a quatre ordres d'héritiers : les descendants, les collatéraux privilégiés, les ascendants et les collatéraux ordinaires (article 734 du code civil).

        En l'espèce,
        ${descendants.map(descendant => `${capitalize(descendant)} est un descendant du de cujus, il appartient au premier ordre.\n`)}
        ${ascendantsPrivilégiés.map(ascendantPrivilégié => `${capitalize(ascendantPrivilégié)} est un ascendant privilégié, il appartient au deuxième ordre.\n`)}
        ${collatérauxPrivilégiés.map(collatéralPrivilégié => `${capitalize(collatéralPrivilégié)} est.\n`)}
        ${ascendants.map(ascendant => `${capitalize(ascendant)} est.\n`)}
        ${collatéraux.map(collatéral => `${capitalize(collatéral)} est.\n`)}

        Les père et mère du défunt se classent a minima dans la catégorie des ascendants. Toutefois, s'il existe des collatéraux privilégiés ordinaires, ils remontent à leurs côtés dans l'ordre des collatéraux privilégiés (article 738 du code civil).
        `
    )
}

export function renderDegrés(degrés: DegréData[]) {

    return (
        `
        En principe, à l'intérieur de l'ordre favorable, l'héritier le plus proche exclut l'héritier le plus éloigné. Cette proximité est mesurée par le degré séparant le de cujus et l'héritier visé, dont le calcul dépend de la nature directe ou collatérale de la ligne.
        ${degrés.map(degré => `${degré.name} est de degré ${degré.degré}`)}
        `
    )
}

export function renderDroits(droits: DroitData[]) {

    return (
        `
        En principe, à l'intérieur d'un même ordre successoral, les héritiers proches et de même degré se répartissent le bénéfice de la succession à égale portion et par tête.
	
        Par exception, en présence d'une fente on distingue les deux branches. Puis, à l'intérieur de chaque branche, on partage par tête.
	
        Par exception, en présence d'une représentation, on distingue les souches. Puis, à l''intérieur de chaque souche, on partage par tête.
        `
    )
}

const capitalize = (name: string) => name.charAt(0).toUpperCase() + name.slice(1)
