import { useState } from 'react';
import { router } from '@inertiajs/react';

export default function Index({ tasks }) {
    const [title, setTitle] = useState('');
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editingTitle, setEditingTitle] = useState('');

    // Add Task
    const addTask = (e) => {
        e.preventDefault();

        if (!title.trim()) {
            return;
        }

        router.post('/tasks', {
            title: title.trim(),
        });

        setTitle('');
    };

    // Complete / Undo Task
    const toggleTask = (taskId) => {
        router.put(`/tasks/${taskId}`);
    };

    // Delete Task
    const deleteTask = (taskId) => {
        router.delete(`/tasks/${taskId}`);
    };

    // Start Editing
    const startEditing = (task) => {
        setEditingTaskId(task.id);
        setEditingTitle(task.title);
    };

    // Cancel Editing
    const cancelEditing = () => {
        setEditingTaskId(null);
        setEditingTitle('');
    };

    // Save Edited Task
    const saveTask = (taskId) => {
        if (!editingTitle.trim()) {
            return;
        }

        router.put(`/tasks/${taskId}`, {
            title: editingTitle.trim(),
        });

        setEditingTaskId(null);
        setEditingTitle('');
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="mx-auto max-w-3xl px-6">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-800">
                        Student Task Manager
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Keep track of your assignments and daily tasks.
                    </p>
                </div>

                {/* Add Task Section */}
                <div className="mb-8 rounded-xl bg-white p-6 shadow">
                    <h2 className="mb-4 text-xl font-semibold text-gray-700">
                        Add Task
                    </h2>

                    <form
                        onSubmit={addTask}
                        className="flex gap-3"
                    >
                        <input
                            type="text"
                            placeholder="Enter a task..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="flex-1 rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        />

                        <button
                            type="submit"
                            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
                        >
                            Add Task
                        </button>
                    </form>
                </div>

                {/* Tasks Section */}
                <div className="rounded-xl bg-white p-6 shadow">

                    {/* Tasks Header */}
                    <div className="mb-5 flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-gray-700">
                            Tasks
                        </h2>

                        <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
                            {tasks.length}{' '}
                            {tasks.length === 1 ? 'task' : 'tasks'}
                        </span>
                    </div>

                    {/* No Tasks */}
                    {tasks.length === 0 ? (
                        <div className="py-10 text-center text-gray-500">
                            <p className="text-lg">
                                No tasks yet.
                            </p>

                            <p className="mt-1 text-sm">
                                Add your first task above.
                            </p>
                        </div>
                    ) : (

                        /* Task List */
                        <div className="space-y-3">

                            {tasks.map((task) => (
                                <div
                                    key={task.id}
                                    className="flex items-center justify-between rounded-lg border border-gray-200 p-4"
                                >

                                    {/* Task Details */}
                                    <div className="flex flex-1 items-center gap-3">

                                        {/* Status Icon */}
                                        <span className="text-xl">
                                            {task.completed ? '✅' : '☐'}
                                        </span>

                                        {/* Edit Input OR Task Title */}
                                        {editingTaskId === task.id ? (
                                            <input
                                                type="text"
                                                value={editingTitle}
                                                onChange={(e) =>
                                                    setEditingTitle(
                                                        e.target.value
                                                    )
                                                }
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') {
                                                        saveTask(task.id);
                                                    }

                                                    if (e.key === 'Escape') {
                                                        cancelEditing();
                                                    }
                                                }}
                                                autoFocus
                                                className="flex-1 rounded-lg border border-blue-400 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-200"
                                            />
                                        ) : (
                                            <span
                                                className={
                                                    task.completed
                                                        ? 'text-gray-400 line-through'
                                                        : 'text-gray-700'
                                                }
                                            >
                                                {task.title}
                                            </span>
                                        )}

                                    </div>

                                    {/* Buttons */}
                                    <div className="ml-4 flex gap-2">

                                        {editingTaskId === task.id ? (
                                            <>
                                                {/* Save Button */}
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        saveTask(task.id)
                                                    }
                                                    className="rounded-lg bg-blue-100 px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-200"
                                                >
                                                    Save
                                                </button>

                                                {/* Cancel Button */}
                                                <button
                                                    type="button"
                                                    onClick={cancelEditing}
                                                    className="rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
                                                >
                                                    Cancel
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                {/* Edit Button */}
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        startEditing(task)
                                                    }
                                                    className="rounded-lg bg-yellow-100 px-3 py-2 text-sm font-medium text-yellow-700 hover:bg-yellow-200"
                                                >
                                                    Edit
                                                </button>

                                                {/* Complete / Undo Button */}
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        toggleTask(task.id)
                                                    }
                                                    className="rounded-lg bg-green-100 px-3 py-2 text-sm font-medium text-green-700 hover:bg-green-200"
                                                >
                                                    {task.completed
                                                        ? 'Undo'
                                                        : 'Complete'}
                                                </button>

                                                {/* Delete Button */}
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        deleteTask(task.id)
                                                    }
                                                    className="rounded-lg bg-red-100 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-200"
                                                >
                                                    Delete
                                                </button>
                                            </>
                                        )}

                                    </div>

                                </div>
                            ))}

                        </div>
                    )}

                </div>

            </div>
        </div>
    );
}