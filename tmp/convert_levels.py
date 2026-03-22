import os
import json
import re

langs = ['python', 'java', 'c', 'cpp']
levels = range(1, 8) # 0 is already done

def convert():
    for lang in langs:
        for lvl in levels:
            js_path = f"c:/Users/Abhi/Desktop/final_s/src/components/{lang}/data/level{lvl}.js"
            if not os.path.exists(js_path):
                continue
            
            with open(js_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Extract Foundation and Tests (naive regex but these files are consistent)
            foundation_match = re.search(r'const L\d_FOUNDATION = (\[.*?\]);', content, re.DOTALL)
            tests_match = re.search(r'const L\d_TESTS = (\[.*?\]);', content, re.DOTALL)
            
            if not foundation_match or not tests_match:
                print(f"Failed to match level {lvl} for {lang}")
                continue
            
            # Fix some JS-isms to make it JSON (like icons and unquoted keys)
            foundation_str = foundation_match.group(1)
            tests_str = tests_match.group(1)
            
            def clean_js(s):
                # Replace icons with strings
                s = re.sub(r'icon:\s*([A-Z][a-zA-Z0-9]+)', r'icon: "\1"', s)
                # Quote unquoted keys
                s = re.sub(r'([{,])\s*([a-zA-Z0-9_]+):', r'\1 "\2":', s)
                # Replace single quotes with double quotes (tricky with nested quotes)
                # But these files mostly use double quotes for content or escaped single quotes
                # For now let's try a simpler approach if it fails
                return s

            # More robust: clean up the JS string to be valid JSON
            # Actually, I can use a simpler trick: find/replace specific icons
            # and then use a JS runtime if possible, or just be careful with regex.
            
            foundation_json_str = clean_js(foundation_str)
            tests_json_str = clean_js(tests_str)
            
            # Final touch: remove trailing commas in arrays/objects
            foundation_json_str = re.sub(r',\s*([\]}])', r'\1', foundation_json_str)
            tests_json_str = re.sub(r',\s*([\]}])', r'\1', tests_json_str)
            
            try:
                # Some files use single quotes for strings that need to be double quotes for JSON
                # This is the hardest part without a real parser.
                # Let's try to just use YAML or a more lenient parser if I had one.
                # Or just do a lot of string replaces.
                
                # Replace '...' with "..." but avoid hurting inner "
                # Actually, let's keep it simple: if it can't parse, I'll do it manually.
                # Let's try to fix quotes: (['])(.*?)\1 -> "\2"
                foundation_json_str = re.sub(r"'(.*?)'", r'"\1"', foundation_json_str)
                tests_json_str = re.sub(r"'(.*?)'", r'"\1"', tests_json_str)
                
                # Fix escaped quotes if any
                foundation_json_str = foundation_json_str.replace('\\"', '"')
                tests_json_str = tests_json_str.replace('\\"', '"')

                foundation = json.loads(foundation_json_str)
                tests = json.loads(tests_json_str)
                
                result = {
                    "label": f"{lang.upper()}_ARCADE",
                    "foundation": foundation,
                    "tests": tests
                }
                
                out_dir = f"c:/Users/Abhi/Desktop/final_s/public/data/levels/{lang}/{lvl}"
                os.makedirs(out_dir, exist_ok=True)
                with open(os.path.join(out_dir, "index.json"), "w", encoding='utf-8') as out_f:
                    json.dump(result, out_f, indent=2)
                
                print(f"Successfully converted level {lvl} for {lang}")
                
            except Exception as e:
                print(f"Error parsing level {lvl} for {lang}: {e}")
                # print(foundation_json_str[:200]) # Debug

convert()
