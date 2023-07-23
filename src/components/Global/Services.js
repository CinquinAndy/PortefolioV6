import React from 'react';

function Services({content_website, services}) {
    return (
        <>
            <section className="p-4 xl:p-20 pt-[100px] xl:pt-[300px] w-full ">
                <div className="flex justify-between">
                    <div className="w-2/3 xl:w-1/2">
                        <h2 className="text-2xl leading-snug normal-case xl:text-5xl">
                            Mes différents <span className="text-sky-600 font-display">services</span> pour
                            réaliser votre <span className="text-indigo-600 font-display">projet.</span>
                        </h2>
                    </div>
                    <div className="flex justify-end items-end w-1/2">
                        <button onClick="location.href = '/contact'"
                                className="px-6 py-3 text-xs bg-indigo-600 rounded xl:text-sm xl:px-10 xl:py-4">Me contacter
                        </button>
                    </div>
                </div>
                <div className="flex overflow-hidden flex-row flex-nowrap mt-10 xl:mt-20">
                    <div className="flex flex-row flex-nowrap gap-[20px] xl:gap-[40px] animate-scrolling">

                        <section className="flex flex-col w-[300px] xl:w-[600px] h-[300px] xl:h-[350px] p-8 xl:p-20 bg-slate-1000">
                            <div className="flex justify-center items-center w-full">
                                <img src="<?= esc_url($service['img']['url']) ?>" alt="<?= esc_attr($service['img']['alt']) ?>"
                                     className="w-[50px] h-[50px] xl:w-[75px] xl:h-[75px]">
                            </div>
                            <header className="flex justify-center items-center py-8 w-full xl:py-6">
                                <h2 className="text-lg normal-case xl:text-xl">
                                    <?= preg_replace('/\*([^*]+)\*/', '<span class="text-indigo-500 font-display">\1</span>', $service['title']) ?>
                                </h2>
                            </header>
                            <article className="text-xs xl:text-sm">
                                <?= preg_replace('/\*([^*]+)\*/', '<span class="text-sky-500">\1</span>', $service['description']) ?>
                            </article>
                        </section>
                    </div>
                </div>


                <!--     Derniers projets -->
                <div className="flex justify-between mt-[100px] xl:mt-[300px]">
                    <div className="w-1/2">
                        <h2 className="text-2xl leading-snug normal-case xl:text-5xl">
                            Mes derniers <span className="text-sky-500 font-display">projets</span><span
                            className="text-indigo-500 font-display">&nbsp;réalisés !</span>
                        </h2>
                    </div>
                    <div className="flex flex-col items-end w-1/2 xl:flex-row xl:justify-end">
                        <button onClick="location.href = '/contact'"
                                className="px-6 py-3 mb-4 text-xs bg-indigo-600 rounded xl:text-sm xl:px-10 xl:py-4 xl:mb-0 xl:mr-6">
                            Me contacter
                        </button>
                        <button onClick="location.href = '/portefolio'"
                                className="px-6 py-3 mb-4 text-xs bg-sky-600 rounded xl:mb-0 xl:text-sm xl:px-10 xl:py-4">Mes réalisations
                        </button>
                    </div>
                </div>
                <div className="flex overflow-hidden flex-row flex-nowrap mt-10 xl:mt-20">
                    <div className="flex flex-row flex-nowrap gap-[20px] xl:gap-[40px] animate-scrolling-rea">
                        <!--            Animate firt part -->
                        <?php foreach (get_posts() as $post): ?>
                        <a href="<?= esc_url(get_permalink($post)) ?>"
                           className="flex flex-col w-[400px] xl:w-[600px] h-[400px] xl:h-[350px] p-10 xl:p-14 pb-4 relative">
                            <h2 className="absolute top-0 left-0 z-30 mt-4 w-2/3 text-2xl font-black normal-case xl:mt-0 xl:text-3xl">
                                <?= $post->post_title ?>
                            </h2>
                            <div
                                className="custom-card w-full h-full shadow-innercustom bg-<?= $post->ID ?> z-10 brightness-50 my-2"></div>
                            <style>
                                .bg-<?= $post->ID ?> {
                                background: url(<?= get_the_post_thumbnail_url($post)?>) no-repeat center center;
                                background-size: cover;
                            }
                            </style>
                            <h2 className="absolute bottom-0 left-0 z-30 mt-4 text-xl font-black text-sky-400 xl:mt-0 xl:text-3xl xl:font-bold">
                                <?php preg_match('/"second_section_subtitle": "(.*)",/', $post->post_content, $matches) ?>
                                <?= $matches[1] ?>
                            </h2>
                        </a>
                        <?php endforeach; ?>

                        <!--             Second part (for carroussel animation) -->
                        <?php foreach (get_posts() as $post): ?>
                        <a href="<?= esc_url(get_permalink($post)) ?>"
                           className="flex flex-col w-[400px] xl:w-[600px] h-[400px] xl:h-[350px] p-10 xl:p-14 pb-4 relative">
                            <h2 className="absolute top-0 left-0 z-30 mt-4 w-2/3 text-2xl font-black normal-case xl:mt-0 xl:text-3xl">
                                <?= $post->post_title ?>
                            </h2>
                            <div
                                className="custom-card w-full h-full shadow-innercustom bg-<?= $post->ID ?> z-10 brightness-50 my-2"></div>
                            <style>
                                .bg-<?= $post->ID ?> {
                                background: url(<?= get_the_post_thumbnail_url($post)?>) no-repeat center center;
                                background-size: cover;
                            }
                            </style>
                            <h2 className="absolute bottom-0 left-0 z-30 mt-4 text-xl font-black text-sky-400 xl:mt-0 xl:text-3xl xl:font-bold">
                                <?php preg_match('/"second_section_subtitle": "(.*)",/', $post->post_content, $matches) ?>
                                <?= $matches[1] ?>
                            </h2>
                        </a>
                        <?php endforeach; ?>
                    </div>
                </div>

                <!--    Contact part -->
                <div className="flex justify-center items-center mt-[100px] xl:mt-[300px] bg-slate-1000 shadow-innercustom rounded p-12 xl:p-20">
                    <div>
                        <div className="flex justify-center items-center w-full">
                            <h2 className="text-xl font-bold text-center xl:text-3xl">Développons <span
                                className="font-black text-indigo-500 xl:font-bold font-display">ensemble</span> vos projets</h2>
                        </div>
                        <p className="py-8 text-sm text-center xl:py-10 xl:text-sm">
                            Une idée, un projet ?
                            Je suis là pour répondre à vos demandes et vous accompagner.
                            <br><br>
                                N’hésitez pas, je serais ravi d’échanger avec vous sur votre projet !
                        </p>
                        <div className="flex justify-center items-center">
                            <button onClick="location.href = '/contact'"
                                    className="px-6 py-3 text-xs bg-indigo-600 rounded xl:text-sm xl:px-10 xl:py-4">Me contacter
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Services;