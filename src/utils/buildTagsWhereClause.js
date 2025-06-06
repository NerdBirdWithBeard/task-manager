function buildTagsWhereClause(tagString) {
    if (!tagString || typeof tagString !== 'string') return [];

    const uniqueTags = [...new Set(
        tagString
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0)
    )];

    if (uniqueTags.length === 0) return [];

    return uniqueTags.map(tag => ({
        taskTags: {
        some: {
            tag: {
            name: tag,
            },
        },
        },
    }));
}

module.exports = buildTagsWhereClause;
