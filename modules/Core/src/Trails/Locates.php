<?php

namespace Modules\Core\Trails;

use File;

trait Locates {

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo: translations
     * @param string $module
     * @return Array
     */
    protected function translations($module = "Core") {
        $translations = collect();
        foreach (\Config::get("module.core.locales", []) as $locale) {
            $translations[$locale] = $this->translation($locale, $module);
        }
        return $translations;
    }

    /**
     * @author <vanhau.vo@urekamedia.vn>
     * @todo: translation
     * @param string $locale
     * @param string $module
     * @return array
     */
    protected static function translation(string $locale, string $module) {
        $path = \Modules\Core\Core::module_path() . "/{$module}/resources/lang";
        return collect(File::allFiles($path))->flatMap(function ($file) use ($locale, $module) {
            $key = ($translation = $file->getBasename('.php'));
            return [$key => __("{$module}::" . $translation, [], $locale)];
        });
    }
}
