import typeorm from 'typeorm';

const Comment = new typeorm.EntitySchema({
    name: 'Comment',
    columns: {
        id: {
            primary: true,
            generated: 'uuid',
            type: String,
        },
        movie_id: { type: String, },
        user_id: { type: String },
        comment: {
            type: String,
            nullable: true,
        },
    },
});

export default Comment;
