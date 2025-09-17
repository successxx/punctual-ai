#!/bin/bash

echo "⏳ Waiting for database tables to be created..."
echo "Please paste and run the SQL in your Supabase SQL Editor"
echo ""

while true; do
    result=$(node -e "
        const { createClient } = require('@supabase/supabase-js');
        const supabase = createClient(
            'https://autmdlacdenfbggqsgmz.supabase.co',
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF1dG1kbGFjZGVuZmJnZ3FzZ216Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwNzAyODIsImV4cCI6MjA3MzY0NjI4Mn0.le4PLLl3PqoSxcQ9Fsix2ooREYR_RRow481loAWGUf8'
        );
        supabase.from('users').select('count').limit(1).then(({error}) => {
            if (!error) {
                console.log('READY');
            } else {
                console.log('WAITING');
            }
            process.exit(0);
        });
    " 2>/dev/null)

    if [ "$result" = "READY" ]; then
        echo ""
        echo "✅ Database tables created successfully!"
        echo "🎉 Punctual.AI is fully operational!"
        echo ""
        echo "You can now:"
        echo "1. Register at: http://localhost:3000/register"
        echo "2. View API docs at: http://localhost:3000/api/v1/docs"
        echo ""
        break
    else
        echo -n "."
        sleep 2
    fi
done