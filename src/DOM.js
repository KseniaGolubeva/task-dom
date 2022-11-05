/*
  В функцию appendToBody передаются 3 параметра:
  tag - имя тега, content - содержимое тега и count - количество вставок.
  Необходимо, чтобы функция осуществила вставку на страницу указанный тег с указанным содержимым указанное число раз.
  Считаем, что всегда передается тег, допускающий вставку текста в качестве своего содержимого (P, DIV, I и пр.).
*/
export function appendToBody(tag, content, count) {
    const body = document.body;

    for (let i = 0; i < count; i++) {
        const htmlTag = `<${tag}>${content}</${tag}>`;
        body.insertAdjacentHTML('beforeend', htmlTag);
    }
}

/*
  Создайте дерево вложенных тегов DIV.
  Каждый узел дерева должен содержать childrenCount узлов.
  Глубина дерева задается параметром level.
  Каждый элемент должен иметь класс вида item_n, где n - глубина вложенности элемента. (Нумерацию ведем с единицы).
  Сформированное дерево верните в качестве результата работы функции.
*/
export function generateTree(childrenCount, level) {
    const addChildren = function generateChildren(levelChild) {
        const div = document.createElement('div');
        div.className = `item_${levelChild}`;

        if (levelChild < level) {
            for (let i = 0; i < childrenCount; i++) {
                div.append(generateChildren(levelChild + 1));
            }
        }

        return div;
    };

    return addChildren(1);
}

/*
  Используйте функцию для создания дерева тегов DIV из предыдущего задания.
  Создайте дерево с вложенностью 3 и числом элементов в каждом узле 2.
  Далее замените все узлы второго уровня (т.е. имеющие класс item_2) на теги SECTION.
  Остальную структуру дерева сохраните неизменной, включая классы и те элементы,
  которые находились внутри переписанных тегов.
  Сформированное дерево верните в качестве результата работы функции.
*/
export function replaceNodes() {
    const treeRoot = generateTree(2, 3);

    function replaceTag(tag) {
        if (tag.className === 'item_2') {
            const nodes = tag.parentNode.childNodes;
            for (let i = 0; i < nodes.length; i++) {
                const sectionTag = document.createElement('section');
                sectionTag.className = 'item_2';
                sectionTag.innerHTML = nodes[i].innerHTML;
                nodes[i].replaceWith(sectionTag);
            }
        } else {
            replaceTag(tag.firstChild);
        }
    }

    replaceTag(treeRoot);

    return treeRoot;
}
