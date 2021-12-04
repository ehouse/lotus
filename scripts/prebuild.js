import { join } from 'path';
import fs from 'fs';

import { micromark } from 'micromark';
import matter from 'gray-matter';

const postsDirectory = join(process.cwd(), 'blog/_posts/');
const staticDirectory = join(process.cwd(), 'blog/_static/');


function getPostDirectory() {
    // Generate a list of posts and strip off markdown suffix
    return fs.readdirSync(postsDirectory);
}

/**
 * Compiles filepath into a HTML document
 * @param {string} path Full path to file to compile 
 * @returns Compiled markdown as HTML
 */
function compileMarkdown(path){
    const fileContents = fs.readFileSync(path, 'utf8');
    const { content, data } = matter(fileContents);
    
    return { content: micromark(content), sidecar: data } ;
}

function build() {
    // Empty content objects
    const sidecarFile = {};
    const contentFile = {};
    
    // Loop over directory and compile post files
    for (const dir of getPostDirectory()) {
        const fullPath = join(postsDirectory, dir);
        const { content, sidecar } = compileMarkdown(fullPath);

        contentFile[encodeURI(sidecar['Title'])] = content;
        sidecarFile[encodeURI(sidecar['Title'])] = sidecar;
    }

    // Write sidecar and blog content to file
    fs.writeFileSync("dest/content.json", JSON.stringify(contentFile));
    fs.writeFileSync("dest/sidecar.json", JSON.stringify(sidecarFile));
}

build();