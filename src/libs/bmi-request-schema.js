const schema = {
    "type": "object",
    "properties": {
        "body": {
            "type": "object",
            "properties": {
                "userId": { "type": "string", "minLength": 1 },
                "height": { "type": "number", "minimum": 1 },
                "weight": { "type": "number", "minimum": 1 }
            },
            required: [
                "userId",
                "height",
                "weight"
            ]
        }
    },
    "required": ["body"]
};

export default schema;