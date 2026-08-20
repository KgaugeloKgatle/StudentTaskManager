<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
    public function index()
    {
        $tasks = Task::latest()->get();

        return Inertia::render('Tasks/Index', [
            'tasks' => $tasks,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
        ]);

        Task::create([
            'title' => $request->title,
        ]);

        return redirect()->back();
    }

    public function update(Request $request, Task $task)
    {
        if ($request->has('title')) {
            $request->validate([
                'title' => 'required|string|max:255',
            ]);

            $task->update([
                'title' => $request->title,
            ]);
        } else {
            $task->update([
                'completed' => !$task->completed,
            ]);
        }

        return redirect()->back();
    }

    public function destroy(Task $task)
    {
        $task->delete();

        return redirect()->back();
    }
}