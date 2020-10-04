# Succession

Succession is a service that intends to improve french citizens' understanding of theirs inheritance’s rights and to showcase an application of an explainable automated legal reasoning system.

## Installation

Use the node package manager [npm](https://www.npmjs.com/) to install succession's dependencies.

```bash
npm i
```

## Usage

```bash
npm run start:dev
```

## Overview of Use Cases
<img src="https://www.plantuml.com/plantuml/img/dP9D2i9038NtSueixQ8zGIa8_Y2uKheJP6pJ6XXdQZeZAbx8StWnMwGYBKhjBkHxRyAyH65cmHfWolSMKc9CB1ajH5mYGtZpVLXXJgL5ndHRDpz8hBd5H4iClX_1A0ohyaG9HX5iD4pF1RA5zQKI7Zpn6qCGT5-Onml830ypZxLKbojslGrukzmkDGT9-eKdU3BArUdyRLtIxd5dgSW-xWFCHqUf73HuHcNoRMoFg5PO6BPUhwqkKRBs-Xw0Cbnje7D0W-GbvHfSyPjJ7LvJGT2qZQk-9vu0">

*Where:*
- **Expert Sytem Use Case.** Users should be able to fill an interactive family tree with legal information (parenthood, de cujus identity, spouse’s identity, adoption’s relationship, etc) to assess theirs inheritance rights.
- **Explore Use Case.** :
    - Users should be able to add a family tree to the collection of family trees. 
    - Users should be able to search for family trees by their name or category. 
    - Users can search and view all the family trees, but they will have to become a registered member to compute the devolution of a given family tree.
- **Learn Use Case.** See infra.

## The Learn Use Case in detail

This module intends to give an explanation of why a legal claim is true or false given the current rules and facts held by the system. 

An explanation is defined as either a :
- **rationale explanations** : by expressing the final principles of legal reasoning applied to inheritance law (statutes + cases + legal principles)
- **local explanations** : by analyzing the parameters des *cas d'espèces*
- **term explanation** : by providing definitions and illustrations of a legal term

### Proposed Solution (legal reasoning model + terminology):

This system makes decisions in accordance with legal principles. **Given that an explanation is the design rationale behind a decision, an explainable automated legal reasoning system shall support representation of general principles from which the system was designed.** For example, we can explicitly provide the principle that “lex specialis derogat legi generali” in order to explain why a *représentant* is eligible to inherit.

Being able to explain this principle, however, is not enough. **The system also must explain how the general principle has been applied to the problem at hand.** In fact, we assume that our users often already share an understanding of the general legal principles of inheritance law. They will, however, have questions such as: “Why is this particular particular person eligible to have a share of the de cujus' rights?’. Producing responses to these questions involves showing how the expert system’s immediate concerns (the assessment of a family member's legal rights) arise from applying the general principles to the particulars of the *cas d'espèces*. **Thus, the system comprises a representation for legal problem-solving principles (deduction), a representation for legal knowledge, and a way to link the legal problem-solving principles and the legal knowledge (AND-OR tree).**

In addition to the application to legal reasoning principles to the special case, the system must explain itself by providing **descriptions of the domain terms**. Users may need to ask questions about the legal terminology to understand the system‘s responses. Alternatively, experts may also want to know such questions whether the system is using a legal term in the same way they do.

<img src="https://www.plantuml.com/plantuml/img/TP1TJiCm48JVVOfS07439Fu44K82cefdamofLNitsdKA0N5tDYbKJQ4lbkpvPdR7kWxKUV6fq3n4s2cXpdsARXKQ50bvnOswEdhLuexuBQ9fSU4LnQShYYjEFj0zDuXsUn1-YKWBZfj0xOusfOAaG1ov7UpszPDdV6kZdoLao9JdVgNhzmwI5uDcf4afwHK2gb49niGdQ1_pFXyz-HoORa0GdtcR-DX3XbEZEoR5EVauV436rOFMt8jYaOr66w3JgxSbRuEQVrpraca3qIdOnsLf0-U_S78sh-7cfKpUh-9clKmioQXEC3eFjVywkJt3ba7TZqGbliPSFHOnznpd3eeUmvQww_bNTDy0">